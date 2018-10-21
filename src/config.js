var dpr = 1;

// If in browser environment
if (typeof window !== 'undefined') {
    dpr = Math.max(window.devicePixelRatio || 1, 1);
}

// retina 屏幕优化
export var devicePixelRatio = dpr;