import React from 'react';
import {mountPage} from './mount.jsx';
import {Page} from './home.jsx';
import {Shared} from '../native/Shared.jsx';
mountPage(()=> <Shared><Page/></Shared>,()=>{});
