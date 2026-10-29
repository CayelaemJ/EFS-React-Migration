import React from 'react';
import {mountPage} from './mount.jsx';
import {Page,start} from './users.jsx';
import {PortalNavigation,installPortalNavigation} from '../native/PortalNavigation.jsx';
installPortalNavigation();
mountPage(()=> <><Page/><PortalNavigation/></>,start);
