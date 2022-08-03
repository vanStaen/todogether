import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Radio, Tooltip } from "antd";
import {
    DatabaseOutlined,
    AppstoreOutlined,
    CheckSquareOutlined,
    CloseSquareOutlined,
    MoreOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../../stores/listStore/listStore";

import "./ActionRowHeader.css";

export const ActionRowHeader = observer((props) => {
    const [showActionBar, setShowActionBar] = useState(false)

    const showCompletedClickHandler = (e) => {
        listStore.setShowCompleted(e.target.value);
    };

    const displayAsListClickHandler = (e) => {
        listStore.setDisplayAslist(e.target.value);
    };

    useEffect(() => {
        const elementId = "listHeader__ListNameContainer";
        const element = document.getElementById(elementId);
        if (showActionBar) {
            element.style.width = "calc(100% - 175px)";
        } else {
            console.log("here")
            element.style.width = "calc(100% - 35px);";
        }
    }, [showActionBar]);

    return (
        <>
            <div className="actionRowHeader">
                {showActionBar && (
                    <div className="actionRowHeader__SwitchContainer">
                        <div className="actionRowHeader__Switch">
                            <Radio.Group
                                defaultValue={listStore.displayAslist}
                                size="small"
                                buttonStyle="solid"
                                onChange={displayAsListClickHandler}
                            >
                                <Radio.Button value={true}>
                                    <Tooltip title="Display as a list">
                                        <DatabaseOutlined />
                                    </Tooltip>
                                </Radio.Button>
                                <Radio.Button value={false}>
                                    <Tooltip title="Display as a grid">
                                        <AppstoreOutlined />
                                    </Tooltip>
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        &nbsp;
                        <div className="actionRowHeader__Switch">
                            <Radio.Group
                                defaultValue={listStore.showCompleted}
                                size="small"
                                buttonStyle="solid"
                                onChange={showCompletedClickHandler}
                            >
                                <Radio.Button value={true}>
                                    <Tooltip title="Show all task">
                                        <CheckSquareOutlined />
                                    </Tooltip>
                                </Radio.Button>
                                <Radio.Button value={false}>
                                    <Tooltip title="Hide completed task">
                                        <CloseSquareOutlined />
                                    </Tooltip>
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                )}
                <div className="actionRowHeader__moreContainer">
                    <MoreOutlined
                        className="actionRowHeader__more"
                        onClick={() => { setShowActionBar(!showActionBar) }}
                    />
                </div>
            </div>
        </>
    );
});