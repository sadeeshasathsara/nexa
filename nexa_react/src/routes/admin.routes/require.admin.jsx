import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminMe } from "../../apis/admin.apis/admin.me.api";

export default function RequireAdmin() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await adminMe();
        if (!mounted) return;
        setOk(!!me);
      } catch {
        if (!mounted) return;
        setOk(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    // simple inline loader; replace with your spinner if you have one
    return <div style={{padding:24, textAlign:"center"}}>Checking session…</div>;
  }

  if (!ok) {
    return <Navigate to="/v1/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
