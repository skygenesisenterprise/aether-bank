"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Terminal,
  RefreshCw,
  Download,
  Search,
  Trash2,
  Filter,
  Play,
  Pause,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Server,
  Activity,
  Zap,
  AlertCircle,
} from "lucide-react";

import { dockerApi } from "@/lib/api/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  raw: string;
}

interface LogsStats {
  total: number;
  errors: number;
  warnings: number;
  info: number;
  debug: number;
}

function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes}min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}

function parseDockerLogs(logs: string[]): LogEntry[] {
  return logs.map((line) => {
    const timeMatch = line.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/);
    const entry: LogEntry = {
      timestamp: timeMatch ? timeMatch[1] : new Date().toISOString(),
      level: "info",
      message: line,
      raw: line,
    };

    if (/ERROR|FATAL|✗/.test(line)) entry.level = "error";
    else if (/WARN|WARNING/.test(line)) entry.level = "warn";
    else if (/DEBUG|TRACE/.test(line)) entry.level = "debug";
    else if (/INFO|✓|INFOR/.test(line)) entry.level = "info";

    return entry;
  });
}

function getLevelBadge(level: LogEntry["level"]) {
  switch (level) {
    case "error":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Error
        </Badge>
      );
    case "warn":
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-0">
          <AlertCircle className="h-3 w-3" />
          Warn
        </Badge>
      );
    case "debug":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <Info className="h-3 w-3" />
          Debug
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-0">
          <CheckCircle className="h-3 w-3" />
          Info
        </Badge>
      );
  }
}

const containers = [
  { id: "etheriatimes", name: "Etheria Times" },
  { id: "aetherbank", name: "Aether Bank" },
  { id: "aetherbank-db", name: "Aether Bank DB" },
  { id: "etheria-mail", name: "Etheria Mail" },
  { id: "postgres", name: "PostgreSQL" },
  { id: "redis", name: "Redis" },
];

export default function LogsPage() {
  const [selectedContainer, setSelectedContainer] = useState("aetherbank");
  const [lines, setLines] = useState("100");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const fetchLogs = useCallback(async () => {
    if (isPaused) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await dockerApi.getLogs(selectedContainer, parseInt(lines));
      if (res && res.success && res.data?.logs) {
        const parsedLogs = parseDockerLogs(res.data.logs);
        setLogs(parsedLogs);
      } else {
        setError(res?.error || "Failed to fetch logs");
      }
    } catch (err) {
      console.error("[ERROR] Failed to fetch logs:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [selectedContainer, lines, isPaused]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    if (autoRefresh && !isPaused) {
      const interval = setInterval(() => {
        fetchLogs();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, isPaused, fetchLogs]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleDownloadLogs = () => {
    const content = logs.map((log) => log.raw).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${selectedContainer}-${new Date().toISOString()}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.raw.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const stats: LogsStats = {
    total: logs.length,
    errors: logs.filter((l) => l.level === "error").length,
    warnings: logs.filter((l) => l.level === "warn").length,
    info: logs.filter((l) => l.level === "info").length,
    debug: logs.filter((l) => l.level === "debug").length,
  };

  const containerHealth = [
    {
      name: "Erreurs",
      value: stats.errors,
      target: 0,
      status: stats.errors === 0 ? "success" : stats.errors < 5 ? "warning" : "error",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      name: "Warnings",
      value: stats.warnings,
      target: 10,
      status: stats.warnings < 10 ? "success" : "warning",
      icon: AlertTriangle,
      color: "text-amber-600",
    },
    {
      name: "Info",
      value: stats.info,
      target: 0,
      status: "success",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      name: "Debug",
      value: stats.debug,
      target: 0,
      status: "success",
      icon: Info,
      color: "text-gray-600",
    },
  ];

  const recentErrors = logs
    .filter((l) => l.level === "error")
    .slice(-5)
    .reverse();

  const recentWarnings = logs
    .filter((l) => l.level === "warn")
    .slice(-5)
    .reverse();

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Logs</h1>
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">
              <Terminal className="h-3 w-3 mr-1" />
              Docker
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Consultation des logs en temps réel des conteneurs Docker
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto-refresh
          </Button>
          <Button
            variant={isPaused ? "default" : "outline"}
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className={isPaused ? "bg-amber-600 hover:bg-amber-700" : ""}
          >
            {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
            {isPaused ? "Reprendre" : "Pause"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadLogs}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
              <Select value={selectedContainer} onValueChange={setSelectedContainer}>
                <SelectTrigger className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <Server className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Container" />
                </SelectTrigger>
                <SelectContent>
                  {containers.map((container) => (
                    <SelectItem key={container.id} value={container.id}>
                      {container.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={lines} onValueChange={setLines}>
                <SelectTrigger className="w-32 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Lignes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50 lignes</SelectItem>
                  <SelectItem value="100">100 lignes</SelectItem>
                  <SelectItem value="200">200 lignes</SelectItem>
                  <SelectItem value="500">500 lignes</SelectItem>
                  <SelectItem value="1000">1000 lignes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-32 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="error">Errors</SelectItem>
                  <SelectItem value="warn">Warnings</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans les logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchLogs} disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearLogs}>
                <Trash2 className="mr-2 h-4 w-4" />
                Effacer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Banner */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchLogs} className="ml-auto">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium">
                Total Lignes
              </CardDescription>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                <Terminal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : formatNumber(stats.total)}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <Server className="h-3 w-3" />
              <span className="font-semibold">{selectedContainer}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-red-700 dark:text-red-300 font-medium">
                Erreurs
              </CardDescription>
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {isLoading ? "..." : stats.errors}
            </div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-semibold">
                {stats.errors === 0 ? "Aucune" : "Action requise"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-amber-700 dark:text-amber-300 font-medium">
                Warnings
              </CardDescription>
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {isLoading ? "..." : stats.warnings}
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-600 mt-2">
              <Activity className="h-3 w-3" />
              <span className="font-semibold">À surveiller</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
                Info
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {isLoading ? "..." : formatNumber(stats.info)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <Zap className="h-3 w-3" />
              <span className="font-semibold">Normal</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Container Health & Recent Issues */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Santé du Container</CardTitle>
                <CardDescription>Indicateurs de logs</CardDescription>
              </div>
              <Server className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {containerHealth.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      item.status === "success"
                        ? "text-emerald-600"
                        : item.status === "warning"
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.status === "success"
                        ? "bg-emerald-500"
                        : item.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min((item.value / Math.max(stats.total, 1)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-white">Score Stabilité</CardTitle>
                <CardDescription className="text-indigo-200">
                  Basé sur les logs récents
                </CardDescription>
              </div>
              <Zap className="h-5 w-5 text-indigo-200" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold">
                {stats.total > 0
                  ? Math.round(((stats.total - stats.errors) / stats.total) * 100)
                  : 100}
              </div>
              <div className="text-sm text-indigo-200 mt-1">/ 100 points</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Taux de succès</span>
                <span className="font-semibold">
                  {stats.total > 0
                    ? `${Math.round(((stats.total - stats.errors) / stats.total) * 100)}%`
                    : "100%"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Erreurs</span>
                <span className="font-semibold">{stats.errors}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Warnings</span>
                <span className="font-semibold">{stats.warnings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Alertes Récentes</CardTitle>
                <CardDescription>Erreurs et warnings</CardDescription>
              </div>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                {stats.errors + stats.warnings} nouvelles
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {(recentErrors.length > 0
                ? recentErrors
                : recentWarnings.length > 0
                  ? recentWarnings
                  : []
              )
                .slice(0, 3)
                .map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className={`mt-0.5 p-1.5 rounded-lg ${
                        alert.level === "error"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {alert.level === "error" ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white truncate">
                        {alert.message.substring(0, 80)}...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatTimeAgo(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              {recentErrors.length === 0 && recentWarnings.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <CheckCircle className="h-8 w-8 mb-2 text-emerald-500" />
                  <p className="text-sm">Aucune alerte</p>
                </div>
              )}
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Viewer */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Logs Console</CardTitle>
              <CardDescription>
                {selectedContainer} • {filteredLogs.length} entrées
                {autoRefresh && !isPaused && (
                  <span className="ml-2 text-emerald-600">• Auto-refresh actif</span>
                )}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-gray-100 dark:bg-gray-800"
              suppressHydrationWarning
            >
              <Clock className="h-3 w-3 mr-1" />
              <span suppressHydrationWarning>{new Date().toLocaleTimeString("fr-FR")}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-150">
            <div className="bg-gray-900 dark:bg-gray-950 rounded-b-lg">
              {isLoading && logs.length === 0 ? (
                <div className="divide-y divide-gray-800">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-20 h-4 bg-gray-800 rounded animate-pulse" />
                      <div className="w-16 h-5 bg-gray-800 rounded animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Terminal className="h-8 w-8 mb-2" />
                  <p>Aucune entrée de log</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {filteredLogs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 px-4 py-2 hover:bg-gray-800/50 transition-colors"
                    >
                      <span className="text-gray-500 shrink-0 w-20 text-xs font-mono pt-0.5">
                        {log.timestamp.split("T")[1]?.substring(0, 8) || ""}
                      </span>
                      <span className="shrink-0">{getLevelBadge(log.level)}</span>
                      <pre className="text-gray-300 flex-1 text-xs whitespace-pre-wrap break-all font-mono">
                        {log.message}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
