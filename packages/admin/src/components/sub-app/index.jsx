import {useState, useEffect} from 'react';
import {getCurrentActiveSubApp} from '../../qiankun';
import { isActiveApp, getContainerId} from '../../commons/util';
import {getSubApps} from '../../api';
import config from '../../commons/config-hoc';

export default config()(function SubApp() {
    const [apps, setApps] = useState([]);
    const [activeAppNames, setActiveAppNames] = useState([]);
    useEffect(() => {
        (async () => {
            const apps = await getSubApps();
            setApps(apps);
        })();
    }, []);

    const pathname = window.location.pathname;
    useEffect(() => {
        (async () => {
            const app = await getCurrentActiveSubApp();
            if (app && !activeAppNames.includes(app.name)) {
                setActiveAppNames([...activeAppNames, app.name]);
            }
        })();
    }, [pathname, activeAppNames]);

    return apps.map(app => {
        const {name} = app;
        const isActive = isActiveApp(app);
        const style = {
            display: isActive ? 'block' : 'none',
        };

        if (!activeAppNames.includes(name)) return null;

        return (
            <div key={name} id={getContainerId(name)} style={style}/>
        );
    });
});
