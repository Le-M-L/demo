// vue2底层 简单实现
import Vue from './instance/index';

import { initGlobalAPI } from "./global-api"

initGlobalAPI(Vue)
export default Vue;
