import {AdminReportsProvider} from '../native/AdminReports.jsx';
import {SourceStatus} from '../native/SourceStatus.jsx';
import React from 'react';
import {mountPage} from './mount.jsx';
import {Page,start} from './admin.jsx';
import {PortalNavigation,installPortalNavigation} from '../native/PortalNavigation.jsx';
installPortalNavigation();
mountPage(()=> <AdminReportsProvider><Page/><PortalNavigation/><SourceStatus/></AdminReportsProvider>,start);
