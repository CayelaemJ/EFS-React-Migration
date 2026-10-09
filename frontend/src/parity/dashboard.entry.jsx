import {DashboardDialogs} from '../native/DashboardDialogs.jsx';
import {SourceStatus} from '../native/SourceStatus.jsx';
import React from 'react';
import {mountPage} from './mount.jsx';
import {Page,start} from './dashboard.jsx';
import {PortalNavigation,installPortalNavigation} from '../native/PortalNavigation.jsx';
installPortalNavigation();
mountPage(()=> <><Page/><PortalNavigation/><DashboardDialogs/><SourceStatus/></>,start);
