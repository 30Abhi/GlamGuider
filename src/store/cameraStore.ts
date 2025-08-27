import { create } from 'zustand';

interface CameraState {
  isCameraActive: boolean;
  stream: MediaStream | null;
  setIsCameraActive: (active: boolean) => void;
  setStream: (stream: MediaStream | null) => void;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  cleanup: () => void;
}

export const useCameraStore = create<CameraState>((set, get) => ({
  isCameraActive: false,
  stream: null,
  
  setIsCameraActive: (active: boolean) => set({ isCameraActive: active }),
  
  setStream: (stream: MediaStream | null) => set({ stream }),
  
  startCamera: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      
      set({ 
        stream, 
        isCameraActive: true 
      });
    } catch (err) {
      console.error('Camera access error:', err);
      throw err;
    }
  },
  
  stopCamera: () => {
    const { stream } = get();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      set({ 
        stream: null, 
        isCameraActive: false 
      });
    }
  },
  
  cleanup: () => {
    const { stream } = get();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      set({ 
        stream: null, 
        isCameraActive: false 
      });
    }
  }
}));
