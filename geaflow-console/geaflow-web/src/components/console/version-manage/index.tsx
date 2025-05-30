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

import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  Tag,
  Switch,
  Descriptions,
  Button,
  Space,
  message,
  Popconfirm,
  Table,
} from "antd";
import {
  deleteVersion,
  getVersionList,
  updateVersion,
} from "../services/version";
import CreateVersion from "./create";
import styles from "./list.module.less";
import $i18n from "@/components/i18n";

const { Search } = Input;

export const VersionManage: React.FC<{}> = ({}) => {
  const [state, setState] = useState({
    list: [],
    originList: [],
    visible: false,
    item: {},
    createVisible: false,
    reloadCount: 0,
    Search: "",
    comment: "",
  });
  const handelResources = async () => {
    const respData = await getVersionList({ name: state.Search });
    setState({
      ...state,
      list: respData,
      originList: respData,
    });
  };

  useEffect(() => {
    handelResources();
  }, [state.reloadCount, state.Search]);

  const showCurrentClusterConfigInfo = (record) => {
    console.log(record);
    setState({
      ...state,
      visible: true,
      item: record.engineJarPackage,
      comment: record?.comment,
    });
  };

  const handleDelete = async (record) => {
    const resp = await deleteVersion(record.name);
    if (resp) {
      message.success(
          $i18n.get({
            id: "openpiece-geaflow.geaflow.version-manage.DeletedSuccessfully",
            dm: "删除成功",
          })
      );
      setState({
        ...state,
        reloadCount: ++state.reloadCount,
      });
    }
  };

  const columns = [
    {
      title: $i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.VersionName",
        dm: "版本名称",
      }),
      dataIndex: "name",
      key: "name",
      render: (_, record: any) => (
          <span>
          <a onClick={() => showCurrentClusterConfigInfo(record)}>
            {record.name}
          </a>

          <br />
            {record?.comment && (
                <span style={{ fontSize: 12, color: "#ccc" }}>
              {record.comment}
            </span>
            )}
        </span>
      ),
    },

    {
      title: $i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.Status",
        dm: "状态",
      }),
      dataIndex: "type",
      key: "type",
      render: (text, record) => {
        return (
            <Switch
                checked={record?.publish}
                onClick={(checked: boolean) => {
                  updateVersion(record.name, checked).then((res) => {
                    if (!res.success) {
                      message.error(`${res.message}`);
                    }
                    handelResources();
                  });
                }}
                checkedChildren={$i18n.get({
                  id: "openpiece-geaflow.geaflow.plugin-true.system",
                  dm: "是",
                })}
                unCheckedChildren={$i18n.get({
                  id: "openpiece-geaflow.geaflow.plugin-false.system",
                  dm: "否",
                })}
            />
        );
      },
    },
    {
      title: $i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.Operator",
        dm: "操作人",
      }),
      key: "creatorName",
      render: (_, record: any) => (
          <span>
          {$i18n.get({
            id: "openpiece-geaflow.geaflow.version-manage.Creator",
            dm: "创建人：",
          })}
            {record.creatorName} <br />
            {record?.modifierName && (
                <span>
              {$i18n.get(
                  {
                    id: "openpiece-geaflow.geaflow.version-manage.ModifiedByRecordmodifiername",
                    dm: "修改人：{recordModifierName}",
                  },
                  { recordModifierName: record.modifierName }
              )}
            </span>
            )}
        </span>
      ),
    },
    {
      title: $i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.OperationTime",
        dm: "操作时间",
      }),
      key: "createTime",
      render: (_, record: any) => (
          <span>
          {$i18n.get({
            id: "openpiece-geaflow.geaflow.version-manage.CreationTime",
            dm: "创建时间：",
          })}
            {record.createTime} <br />
            {record?.modifyTime && (
                <span>
              {$i18n.get(
                  {
                    id: "openpiece-geaflow.geaflow.version-manage.ModificationTimeRecordmodifytime",
                    dm: "修改时间：{recordModifyTime}",
                  },
                  { recordModifyTime: record.modifyTime }
              )}
            </span>
            )}
        </span>
      ),
    },
    {
      title: $i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.Operation",
        dm: "操作",
      }),
      dataIndex: "container",
      key: "container",
      hideInSearch: true,
      render: (_, record) => {
        return (
            <Space>
              <Popconfirm
                  title={$i18n.get({
                    id: "openpiece-geaflow.geaflow.version-manage.AreYouSureYouWant",
                    dm: "确定删除该记录吗？",
                  })}
                  onConfirm={() => handleDelete(record)}
                  okText={$i18n.get({
                    id: "openpiece-geaflow.geaflow.version-manage.Ok",
                    dm: "确定",
                  })}
                  cancelText={$i18n.get({
                    id: "openpiece-geaflow.geaflow.version-manage.Cancel",
                    dm: "取消",
                  })}
              >
                <a>
                  {$i18n.get({
                    id: "openpiece-geaflow.geaflow.version-manage.Delete",
                    dm: "删除",
                  })}
                </a>
              </Popconfirm>
            </Space>
        );
      },
    },
  ];

  const handleCloseModal = () => {
    setState({
      ...state,
      visible: false,
      item: {},
    });
  };

  const { item } = state;
  return (
      <div className={styles["example-table"]}>
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
        >
          <div style={{ fontWeight: 500, fontSize: 16 }}>
            {$i18n.get({
              id: "openpiece-geaflow.job-management.joblist.VersionsList",
              dm: "版本列表",
            })}
          </div>
          <div>
            <Search
                placeholder={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.EnterASearchKeyword",
                  dm: "请输入搜索关键词",
                })}
                onSearch={(value) => {
                  setState({
                    ...state,
                    Search: value,
                  });
                }}
                style={{ width: 286, marginRight: 16 }}
            />
            <Button
                key="button"
                onClick={() => {
                  setState({
                    ...state,
                    createVisible: true,
                  });
                }}
                type="primary"
            >
              {$i18n.get({
                id: "openpiece-geaflow.geaflow.version-manage.Add",
                dm: "新增",
              })}
            </Button>
          </div>
        </div>
        <Table
            columns={columns}
            dataSource={state.list}
            pagination={{
              showQuickJumper: true,
              hideOnSinglePage: true,
            }}
        />

        <Modal
            title={$i18n.get({
              id: "openpiece-geaflow.geaflow.version-manage.VersionConfigurationParameters",
              dm: "版本配置参数",
            })}
            width={850}
            visible={state.visible}
            onCancel={handleCloseModal}
            onOk={handleCloseModal}
            okText={$i18n.get({
              id: "openpiece-geaflow.geaflow.version-manage.Ok",
              dm: "确定",
            })}
        >
          <Descriptions column={2}>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.JarPackageName",
                  dm: "JAR包名称",
                })}
            >
              {item.name}
            </Descriptions.Item>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.Description",
                  dm: "描述",
                })}
            >
              {state.comment}
            </Descriptions.Item>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.Type",
                  dm: "类型",
                })}
            >
              {item.type}
            </Descriptions.Item>
            <Descriptions.Item label="MD5">{item.md5}</Descriptions.Item>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.Path",
                  dm: "路径",
                })}
            >
              {item.path}
            </Descriptions.Item>
            <Descriptions.Item label="URL">{item.url}</Descriptions.Item>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.CreatorId",
                  dm: "创建人ID",
                })}
            >
              {item.creatorId}
            </Descriptions.Item>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.CreationTime.1",
                  dm: "创建时间",
                })}
            >
              {item.createTime}
            </Descriptions.Item>
            <Descriptions.Item
                label={$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.UpdateTime",
                  dm: "更新时间",
                })}
            >
              {item.modifyTime}
            </Descriptions.Item>
          </Descriptions>
        </Modal>

        <CreateVersion
            visible={state.createVisible}
            close={() =>
                setState({
                  ...state,
                  createVisible: false,
                })
            }
            reload={() =>
                setState({
                  ...state,
                  createVisible: false,
                  reloadCount: ++state.reloadCount,
                })
            }
        />
      </div>
  );
};
