import React from 'react';
import {mountPage} from './mount.jsx';
import {Page} from './404.jsx';
import {Shared} from '../native/Shared.jsx';
mountPage(()=> <Shared><Page/></Shared>,()=>{});
