/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { defineConfig } from "umi";

export default defineConfig({
  hash: true,
  history: {
    type: "hash",
  },
  routes: [
    {
      path: "/",
      routes: [
        { path: "/", redirect: "./studio" },
        {
          component: "./Console/components/ColGeaflowLogin",
          path: "login",
        },
        {
          component: "./Console/components/ColGeaflowRegister",
          path: "register",
        },
        {
          name: "图研发",
          component: "./Studio/Layout",
          path: "studio",
          routes: [
            { path: "/studio", redirect: "./StudioTableDefinition" },
            {
              component: "./Studio/components/StudioTableDefinition",
              path: "StudioTableDefinition",
            },
            {
              component: "./Studio/components/StudioNodeDefinition",
              path: "StudioNodeDefinition",
            },
            {
              component: "./Studio/components/StudioEdgeDefinition",
              path: "StudioEdgeDefinition",
            },
            {
              component: "./Studio/components/StudioGraphDefinition",
              path: "StudioGraphDefinition",
            },
            {
              component: "./Studio/components/StudioGeaflowFunctionManage",
              path: "StudioGeaflowFunctionManage",
            },
            {
              component: "./Studio/components/StudioComputing",
              path: "StudioComputing",
            },
          ],
        },
        {
          name: "运维中心",
          component: "./Console/Layout",
          path: "console",
          routes: [
            { path: "/console", redirect: "./ColJobList" },
            {
              component: "./Console/components/ColJobList",
              path: "ColJobList",
            },
            {
              component: "./Console/components/ColJobDetail",
              path: "ColJobDetail",
            },
            {
              component: "./Console/components/ColGeaflowPlugManage",
              path: "ColGeaflowPlugManage",
            },
            {
              component: "./Console/components/ColInstanceList",
              path: "ColInstanceList",
            },
            {
              component: "./Console/components/ColGeaflowJarfileManage",
              path: "ColGeaflowJarfileManage",
            },
            {
              component: "./Console/components/ColUserManage",
              path: "ColUserManage",
            },
          ],
        },
        {
          name: "一键安装",
          component: "./Console/components/ColQuickInstall",
          path: "quickInstall",
        },
        {
          name: "系统管理",
          component: "./System/Layout",
          path: "system",
          routes: [
            { path: "/system", redirect: "./ColClusterManage" },
            {
              component: "./System/components/ColClusterManage",
              path: "ColClusterManage",
            },
            {
              component: "./System/components/ColGeaflowPlugManage",
              path: "ColGeaflowPlugManage",
            },
            {
              component: "./System/components/ColGeaflowJarfileManage",
              path: "ColGeaflowJarfileManage",
            },
            {
              component: "./System/components/ColVersionManage",
              path: "ColVersionManage",
            },
            {
              component: "./System/components/ColUserManage",
              path: "ColUserManage",
            },
            {
              component: "./System/components/ColTenantManage",
              path: "ColTenantManage",
            },
            {
              component: "./System/components/ColLanguageManage",
              path: "ColLanguageManage",
            },
          ],
        },
      ],
    },
  ],
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputPath: "../app/bootstrap/src/main/resources/public/",
  npmClient: "pnpm",
  favicons: [
    "https://gw.alipayobjects.com/zos/bmw-prod/6290edfc-e134-4074-a550-079eeba9926d.svg",
  ],
  esbuildMinifyIIFE: true,
});
