import { useCallback, useEffect, useRef, useState } from 'react';
import type { CameraDevice } from '../types';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [cameraConnected, setCameraConnected] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');
  const [mirrored, setMirrored] = useState<boolean>(true);

  // Enumerate camera devices
  const updateDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices
        .filter((d) => d.kind === 'videoinput')
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${index + 1}`,
        }));
      setDevices(videoInputs);
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch {
      // Ignore enumeration errors
    }
  }, [selectedDeviceId]);

  const start = useCallback(
    async (deviceId?: string) => {
      try {
        setCameraError('');
        // Stop any current stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        const constraints: MediaStreamConstraints = {
          video: deviceId
            ? { deviceId: { exact: deviceId }, width: { ideal: 1280 }, height: { ideal: 960 } }
            : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setCameraConnected(true);
        await updateDevices();
      } catch (err) {
        setCameraConnected(false);
        setCameraError('Camera access is unavailable or denied. Using sample portraits.');
      }
    },
    [updateDevices]
  );

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraConnected(false);
  }, []);

  const switchCamera = useCallback(
    async (deviceId: string) => {
      setSelectedDeviceId(deviceId);
      await start(deviceId);
    },
    [start]
  );

  const captureFrame = useCallback((): string => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const width = video?.videoWidth || 960;
    const height = video?.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '/sample-portrait.png';

    if (mirrored) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    if (video && video.readyState >= 2 && video.videoWidth > 0) {
      ctx.drawImage(video, 0, 0, width, height);
    } else {
      return '/sample-portrait.png';
    }

    return canvas.toDataURL('image/jpeg', 0.95);
  }, [mirrored]);

  useEffect(() => {
    start(selectedDeviceId || undefined);
    return () => {
      stop();
    };
  }, [start, stop, selectedDeviceId]);

  return {
    videoRef,
    devices,
    selectedDeviceId,
    switchCamera,
    cameraConnected,
    cameraError,
    mirrored,
    setMirrored,
    start,
    stop,
    captureFrame,
  };
}
