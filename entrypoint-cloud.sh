#!/bin/sh
set -e

# =============================================================================
# Aether Bank - Production Service Entry Point
# =============================================================================

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/go/bin:/go/bin:/root/go/bin:/root/.local/share/corepack"
export NODE_ENV="${NODE_ENV:-production}"

# =============================================================================
# Configuration
# =============================================================================

FRONTEND_PORT="${FRONTEND_PORT:-3000}"
API_PORT="${API_PORT:-8080}"

POSTGRES_USER="${POSTGRES_USER:-aether}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-password}"
POSTGRES_DB="${POSTGRES_DB:-etheria_account}"

# =============================================================================
# Logging Functions
# =============================================================================

log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
    echo "[✓]  $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
    echo "[!]  $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo "[X]  $(date '+%Y-%m-%d %H:%M:%S') - $1" >&2
}

# =============================================================================
# Header Display
# =============================================================================

display_header() {
    echo ""
    echo "╔══════════════════════════════════════════════════════════════════════╗"
    echo "║                    Aether Bank System                             ║"
    echo "║               Enterprise Account Management                       ║"
    echo "║                   Version 1.0.0-production                        ║"
    echo "╚══════════════════════════════════════════════════════════════════════╝"
    echo ""
    log_info "Frontend: http://localhost:${FRONTEND_PORT}"
    log_info "API:      http://localhost:${API_PORT}"
    echo ""
}

# =============================================================================
# Database Setup (Embedded PostgreSQL)
# =============================================================================

init_database() {
    log_info "Initializing embedded PostgreSQL..."

    # Check if PostgreSQL is already initialized
    if [ -f "/var/lib/postgresql/data/PG_VERSION" ]; then
        log_success "PostgreSQL already initialized"
        return 0
    fi

    # Initialize PostgreSQL data directory
    mkdir -p /var/lib/postgresql/data
    chown -R postgres:postgres /var/lib/postgresql

    su - postgres -c "initdb -D /var/lib/postgresql/data" 2>/dev/null || true

    # Start PostgreSQL temporarily for setup
    su - postgres -c "pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/logfile start" &
    POSTGRES_PID=$!

    # Wait for PostgreSQL to start
    sleep 3

    # Create database and user
    su - postgres -c "psql -c \"CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}' SUPERUSER;\"" 2>/dev/null || true
    su - postgres -c "psql -c \"CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};\"" 2>/dev/null || true

    # Stop temporary PostgreSQL
    su - postgres -c "pg_ctl -D /var/lib/postgresql/data stop" 2>/dev/null || true

    log_success "PostgreSQL initialized"
    return 0
}

start_postgres() {
    log_info "Starting PostgreSQL..."

    # Start PostgreSQL in background
    su - postgres -c "pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/logfile -o '-k /tmp' start" &

    # Wait for PostgreSQL to be ready
    sleep 3

    # Verify connection
    if su - postgres -c "psql -l" > /dev/null 2>&1; then
        log_success "PostgreSQL is ready"
    else
        log_error "PostgreSQL failed to start"
        return 1
    fi

    return 0
}

run_migrations() {
    log_info "Running database migrations..."

    # Set DATABASE_URL for migrations
    export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

    PRISMA_DIR="/app/server/prisma"

    if [ -d "$PRISMA_DIR" ]; then
        cd "$PRISMA_DIR"

        if [ -f "schema.prisma" ]; then
            log_info "Generating Prisma client..."
            npx prisma generate 2>/dev/null || log_warn "Prisma generate failed"

            log_info "Running database migrations..."
            npx prisma db push --accept-data-loss 2>/dev/null || log_warn "Prisma db push failed"
        fi

        log_success "Database migrations complete"
    else
        log_warn "Prisma directory not found"
    fi
}

# =============================================================================
# Service Starters
# =============================================================================

start_frontend() {
    log_info "Starting Next.js (production mode) on port ${FRONTEND_PORT}..."

    cd /app/app

    # Use production build
    export PORT="$FRONTEND_PORT"
    export NEXT_PUBLIC_BASE_PATH=""
    export NEXT_TELEMETRY_DISABLED=1

    # Start Next.js production server
    node server.js &
    NEXT_PID=$!
    echo "$NEXT_PID" > /tmp/next.pid

    log_info "Next.js started (PID: $NEXT_PID)"

    # Wait for frontend to be ready
    sleep 3

    # Verify it's running
    if kill -0 "$NEXT_PID" 2>/dev/null; then
        log_success "Next.js is ready"
    else
        log_error "Next.js failed to start"
        return 1
    fi

    return 0
}

start_api() {
    log_info "Starting Go API server on port ${API_PORT}..."

    cd /app

    # Set environment for production
    export SERVER_PORT="$API_PORT"
    export ENVIRONMENT="production"

    # Start Go API server (pre-built binary)
    ./server/etheriatimes-api &
    API_PID=$!
    echo "$API_PID" > /tmp/api.pid

    log_info "Go API server started (PID: $API_PID)"

    # Wait for API to initialize
    sleep 3

    # Verify it's running
    if kill -0 "$API_PID" 2>/dev/null; then
        log_success "Go API server is ready"
    else
        log_error "Go API server failed to start"
        return 1
    fi

    return 0
}

# =============================================================================
# Service Monitor
# =============================================================================

monitor_services() {
    log_success "All services started successfully!"
    echo ""
    echo "══════════════════════════════════════════════════════════════════════"
    echo "  Services are running. Press Ctrl+C to stop."
    echo "══════════════════════════════════════════════════════════════════════"
    echo ""

    # Monitor both processes
    while true; do
        # Check if either process died
        if ! kill -0 "$NEXT_PID" 2>/dev/null || ! kill -0 "$API_PID" 2>/dev/null; then
            log_error "A service has stopped unexpectedly!"
            break
        fi
        sleep 5
    done
}

# =============================================================================
# Cleanup Handler
# =============================================================================

cleanup() {
    echo ""
    log_info "Stopping services..."

    # Stop PostgreSQL
    su - postgres -c "pg_ctl -D /var/lib/postgresql/data stop" 2>/dev/null || true

    # Read PIDs
    if [ -f /tmp/next.pid ]; then
        kill "$(cat /tmp/next.pid)" 2>/dev/null || true
        rm -f /tmp/next.pid
    fi

    if [ -f /tmp/api.pid ]; then
        kill "$(cat /tmp/api.pid)" 2>/dev/null || true
        rm -f /tmp/api.pid
    fi

    log_info "All services stopped"
    exit 0
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
    display_header

    # Initialize embedded PostgreSQL
    if init_database; then
        start_postgres
        run_migrations
    else
        log_error "Failed to initialize database"
    fi

    # Start services
    start_frontend || log_error "Frontend failed to start"
    start_api || log_error "API failed to start"

    # Monitor
    monitor_services
}

# Trap for cleanup
trap cleanup SIGINT SIGTERM

# Run
main