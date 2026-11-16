import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a BrowserRouter');
  }
  return context;
};

export const BrowserRouter = ({ children }) => {
  // Normalize current pathname, fallback to '/' if empty
  const getPath = () => {
    if (typeof window === 'undefined') return '/';
    // Support hash router fallback or clean HTML5 history
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('/')) return hash;
    return window.location.pathname || '/';
  };

  const [pathname, setPathname] = useState(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (to) => {
    if (to === pathname) return;
    try {
      window.history.pushState({}, '', to);
      setPathname(to);
    } catch (e) {
      // Fallback for file:// or restricted protocols
      window.location.hash = to;
      setPathname(to);
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Routes = ({ children }) => {
  const { pathname } = useRouter();
  const routes = React.Children.toArray(children);

  let matchElement = null;
  let catchAllElement = null;

  for (const child of routes) {
    if (!React.isValidElement(child)) continue;
    const { path, element } = child.props;

    if (path === '*') {
      catchAllElement = element;
    } else if (path === pathname || (path === '/' && pathname === '')) {
      matchElement = element;
      break;
    }
  }

  return matchElement || catchAllElement || null;
};

export const Route = ({ path, element }) => {
  return null; // Route is matched declaratively by Routes
};

export const Link = ({ to, children, className, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export const NavLink = ({ to, end = false, children, className, onClick, ...rest }) => {
  const { pathname, navigate } = useRouter();

  const isActive = end ? pathname === to : pathname.startsWith(to) && (to !== '/' || pathname === '/');

  const computedClass = typeof className === 'function' ? className({ isActive }) : className;

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} className={computedClass} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};

export const useLocation = () => {
  const { pathname } = useRouter();
  return { pathname, search: '', hash: '' };
};
