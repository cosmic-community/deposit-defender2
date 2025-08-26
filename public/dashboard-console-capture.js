(function() {
  // Only run in iframe context (dashboard preview)
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Helper function to safely stringify objects
  function safeStringify(obj) {
    try {
      return JSON.stringify(obj, function(key, value) {
        if (typeof value === 'function') {
          return '[Function]';
        }
        if (value instanceof Error) {
          return value.toString();
        }
        return value;
      }, 2);
    } catch (e) {
      return '[Object]';
    }
  }
  
  // Capture console logs and send to parent
  function captureLog(level, args) {
    // Convert arguments to strings
    const message = Array.prototype.slice.call(args).map(function(arg) {
      if (typeof arg === 'object' && arg !== null) {
        return safeStringify(arg);
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level,
      message: message,
      url: window.location.href
    };
    
    // Add to local storage (with limit)
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    // Send to parent dashboard
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Fail silently if postMessage fails
    }
    
    // Call original console method
    originalConsole[level].apply(console, args);
  }
  
  // Override console methods
  console.log = function() { captureLog('log', arguments); };
  console.warn = function() { captureLog('warn', arguments); };
  console.error = function() { captureLog('error', arguments); };
  console.info = function() { captureLog('info', arguments); };
  console.debug = function() { captureLog('debug', arguments); };
  
  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', [
      'Unhandled Error: ' + event.message,
      'File: ' + event.filename,
      'Line: ' + event.lineno + ':' + event.colno,
      'Stack: ' + (event.error && event.error.stack ? event.error.stack : 'No stack trace')
    ]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [
      'Unhandled Promise Rejection: ' + (event.reason || 'Unknown reason')
    ]);
  });
  
  // Function to send ready message to parent
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Fail silently
    }
  }
  
  // Function to send route change information
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Fail silently
    }
  }
  
  // Send ready message when loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      sendReady();
      sendRouteChange();
    });
  } else {
    sendReady();
    sendRouteChange();
  }
  
  // Monitor route changes for SPA navigation
  // Override pushState and replaceState to detect programmatic navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(sendRouteChange, 0); // Use timeout to ensure URL has changed
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  // Listen for back/forward button navigation
  window.addEventListener('popstate', function() {
    setTimeout(sendRouteChange, 0);
  });
  
  // Listen for hash changes
  window.addEventListener('hashchange', function() {
    setTimeout(sendRouteChange, 0);
  });
  
  // Send initial route info
  window.addEventListener('load', function() {
    sendRouteChange();
  });
})();