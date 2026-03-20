"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Camera, 
  Settings, 
  Wifi, 
  Shield, 
  Zap,
  Activity, 
  ShieldCheck, 
  RefreshCcw, 
  VideoOff,
  ShieldAlert,
  Play
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from 'react';

export default function CameraPage() {
  const [isLive, setIsLive] = useState(false);
  const [stats, setStats] = useState({ violations: 0, recent: [] as any[] });
  const [yoloStatus, setYoloStatus] = useState<'online' | 'offline' | 'linking'>('linking');
  const [feedKey, setFeedKey] = useState(0);
  
  const getApiBase = () => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    const hostname = window.location.hostname;
    return `http://${hostname}:5000`;
  };

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${getApiBase()}/get_stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setYoloStatus('online');
      }
    } catch (err) {
      setYoloStatus('offline');
    }
  }, []);

  useEffect(() => {
    fetchStats();
    if (isLive) {
      const interval = setInterval(fetchStats, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive, fetchStats]);

  const toggleScan = () => {
    if (!isLive) {
      setFeedKey(Date.now());
    }
    setIsLive(!isLive);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tighter text-primary flex items-center gap-3">
          SENTINEL VISION 
          <Badge variant="outline" className="text-xs uppercase px-3 py-1 border-primary/30">Active Feed v1.0</Badge>
        </h2>
        <p className="text-muted-foreground font-medium italic flex items-center gap-2">
          <Wifi className="h-3 w-3 animate-pulse text-primary" /> 
          AI Direct Link: {isLive ? 'ESTABLISHED' : 'STANDBY'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="relative overflow-hidden border-2 shadow-2xl bg-black aspect-video flex items-center justify-center rounded-2xl group">
            {isLive ? (
              <img 
                key={feedKey}
                src={`${getApiBase()}/video_feed?t=${feedKey}`} 
                alt="Dashcam AI Stream" 
                className="w-full h-full object-contain"
                onError={() => setYoloStatus('offline')}
              />
            ) : (
              <div className="text-center p-12 space-y-6">
                <div className="p-6 rounded-full bg-primary/10 border border-primary/20 inline-block">
                  <VideoOff className="h-12 w-12 text-primary/40" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Feed Dormant</h4>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    The AI Sentinel is ready to process the static road feed.
                  </p>
                </div>
                <Button 
                  onClick={toggleScan}
                  className="bg-primary hover:bg-primary/90 text-black font-black px-8 py-6 rounded-xl animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  START AI SCAN
                </Button>
              </div>
            )}

            {/* Status Badges Overlay */}
            {isLive && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className={`backdrop-blur-md text-white border-0 py-1.5 px-3 font-mono text-[10px] flex gap-2 items-center ${yoloStatus === 'online' ? 'bg-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-red-500/80 animate-pulse'}`}>
                  <Zap className="h-3 w-3" />
                  AI LINK: {yoloStatus.toUpperCase()}
                </Badge>
                <Badge className="bg-blue-600/80 backdrop-blur-md text-white border-0 py-1.5 px-3 font-mono text-[10px] uppercase flex gap-2 items-center">
                  <Activity className="h-3 w-3" />
                  SOURCE: SAMPLE_ROAD_MP4
                </Badge>
              </div>
            )}
            
            {isLive && (
              <div className="absolute bottom-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={toggleScan}
                  className="font-black px-6 shadow-lg"
                >
                  STOP SCAN
                </Button>
              </div>
            )}
          </Card>

          <Alert className="bg-primary/5 border-2 border-primary/10 rounded-xl">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <AlertTitle className="font-bold text-primary">System Integrity Check</AlertTitle>
            <AlertDescription className="text-xs">
              AI YOLO Engine is processing the sample video path. All detections are recorded to the central mission database.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-6">
          <Card className="border-2 shadow-xl bg-primary/[0.02] rounded-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Mission Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-black border border-white/5 shadow-inner">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">Total Detections</p>
                  <p className="text-4xl font-black text-primary tracking-tighter">{stats.violations}</p>
                </div>
                <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10">
                  <p className="text-[10px] font-bold text-green-600 uppercase mb-1 tracking-widest">Sentinel Points</p>
                  <p className="text-3xl font-black text-green-600 tracking-tighter">{stats.violations * 25} PTS</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                   <Activity className="h-3 w-3" />
                   Recent Activity Log
                </p>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar grayscale hover:grayscale-0 transition-all">
                  {stats.recent.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-xl opacity-20">
                      <Zap className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-[10px]">AWAITING DATA</p>
                    </div>
                  ) : (
                    stats.recent.slice(0, 5).map((v: any, i: number) => (
                      <div key={i} className="flex flex-col p-3 rounded-xl bg-muted/30 border border-primary/5 hover:border-primary/20 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-[11px] text-primary">{v.type || 'Violation'}</span>
                          <span className="text-[9px] font-mono opacity-50">{v.time}</span>
                        </div>
                        <div className="text-[9px] opacity-70 font-medium">Vehicle ID: {v.id || 'Unknown'}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-2 border-primary/20 text-xs font-black uppercase tracking-widest hover:bg-primary/10"
                onClick={fetchStats}
              >
                <RefreshCcw className="h-3 w-3 mr-2" />
                Sync Database
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
