## Usage 使用说明

### API;
#### import FlowChart, { addNode, addBranch, expandBranch, combineNodes, deleteNode } from './FlowChart';

### 外部容器(backgroundColor)
##### FlowChart容器占满外部容器， 需设置backgroundColor属性与外容器backgroundColor一致（掩盖线）
```javascript
    <div className="flowchart-container" style={{ backgroundColor: "#f0f0f0" }}>
        <FlowChart
            backgroundColor='#f0f0f0'
        />
    </div>
```

### 数据(*data, *headNodeId)
##### data为链表结构对象，data中的每个键值对代表一个节点，节点必须有id, next, pre这三个属性（头结点不能有pre, 尾节点不能有next）。节点任意添加自定义属性，会透传至组件。
##### 必须通过headNodeId属性显示声明头结点。
```javascript
    data = {
        head: {
            id: 'head',
            next: ['aa'],

            type: 'head',
        },
        aa:{
            id: 'head',
            next: ['tail'],
            pre: ['head'],

            type: 'head',
        },
        tail: {
            id: 'tail',
            pre: ['aa'],

            type: 'tail',
        }
    }
    <FlowChart
        backgroundColor='#f0f0f0'
        data={data}
        headNodeId='head'
    />
```

### 渲染节点(*RenderNode)
##### 通过RenderNode（React.Element或者返回React.Element）属性渲染节点
##### 也通过在节点自身属性中增加Render字段渲染节点，优先级更高
```javascript
    const typeMap = {
        head: <div style={{ width: 200, height: 100, background: 'black', color: "#fff" }}>{props.id}</div>
        tail: (props) => <div style={{ width: 200, height: 100, background: 'pink', color: "#fff" }}>{props.id}</div>
    },


    const initData = {
        head: {
            id: 'head',
            next: ['tail'],
            type: 'head',
            Render: (props) => <div style={{ width: 200, height: 100, background: 'pink', color: "#fff" }}>{props.id}</div>
        },
        tail: {
            id: 'tail',
            pre: ['head'],
            type: 'tail',
        }
    }

    const RenderNode = (props) => {
        return typeMap[props.type](props);
    }

    <FlowChart
        data={initData}
        RenderNode={RenderNode}
    />
```

### 配置设置
##### 通过config属性设置显示内容{lineWidth: 连接线的宽度，lineColor:线的颜色, distance: { horizontal:节点横向间隔，vertical: :节点纵向间隔}}, brotherNodeAlign(top | bottom | center): 不同高度情况下兄弟节点的对齐方式。} padding: {left, right, top, bottom(number)}容器与流程图间隔
##### 下面数值为默认值
```javascript
    <FlowChart
        config={{
            lineWidth: 2,
            lineColor: '#000',
            distance: { horizontal: 50, vertical: 40 },
            padding: { top: 24, left: 36, right: 36, bottom: 24 },
            brotherNodeAlign: 'center' // top bottom
        }}
    />
```

### 操作按钮(showAddButton, showBranchButton, showCombineButton, 默认全启用)
##### 内置三种操作按钮: 节点下方对应showAddButton;　分支上方的对应showBranchButton；分支下方的对应showCombineButton。置属性值为true/false启用/不启用

```javascript
    <FlowChart
        showAddButton={true}
        showBranchButton={true}
        showCombineButton={true}
    />
```

### 自定义操作按钮(RenderAddButton, RenderBranchButton, RenderCombineButton)
##### 可以自定义渲染这三种操作按钮
```javascript
    const RenderAddButton = (
        <button>add</button>
    );

    const RenderBranchButton = () => {
        return (
            <button>branch</button>
        )
    };

    const RenderMergeButton = (
        <button>merge</button>
    );

    <FlowChart
        RenderAddButton={RenderAddButton}
        RenderBranchButton={RenderBranchButton}
        RenderCombineButton={RenderMergeButton}
    />
```

### 透传属性
##### RenderNode节点中， 可以从props拿到以下属性
##### 节点自身属性中除了(pre, next, Render)之外的所有属性，及id和自定义属性
##### 触发操作回调的几种Action Function (onClickDeleteNode, onClickAddBranch, onClickAddNode, onClickAdd)
##### 判断当前节点能否删除的canDelete(boolean)属性， 判断当前节点能否新增分支的canAddBranch(boolean)属性

```javascript
    const typeMap = {
        head: ({ onClickAddNode, onClickDeleteNode, onClickAddBranch, canDelete, canAddBranch, ...props }) => {
            return (
                <div style={{ width: 200, height: 100, background: 'black', color: "#fff" }}>
                    {props.id}
                    <button onClick={onClickAddNode}>addNode</button>
                    {canAddBranch && <button onClick={onClickAddBranch}>addBranch</button>}
                    {canDelete && <button onClick={onClickDeleteNode}>delete</button>}
                </div>
            )
        },
        tail: (props) => {
            return (
                <div style={{ width: 200, height: 100, background: 'pink', color: "#fff" }}>{props.id}</div>
            )
        },
    }

    const RenderNode = (props) => {
        return typeMap[props.type](props);
    }
    <FlowChart
        RenderNode={RenderNode}
    />
```

### 操作回调(onChange)
##### 通过点击内置操作按钮，或者透传至节点的Action触发onChange
##### 三种操作按钮对应回调type分别为'add'(target为所属节点id), 'expandBranch'(target为分支所属节点id), 'combineNodes'(target为对应分支的启示节点Id数组集合)
##### 此外透传至节点的Action可触发以下type回调 onClickAdd->'add'(target为所属节点id), onClickAddNode->'addNode'(target为所属节点id)
##### onClickDeleteNode->'deleteNode'(target为所属节点id), , onClickAddBranch->'addBranch'(target为所属节点id)
```javascript
    <FlowChart
        onChange={({ type, target }) => {

        }}
    />
```

### 内置数据操作API(addNode, addBranch, expandBranch, combineNodes, deleteNode)
##### import FlowChart, { addNode, addBranch, expandBranch, combineNodes, deleteNode } from './FlowChart';

```javascript
    const [data, setData] = useState(initData);

    const onChange = useCallback(({ type, target }) => {
        if (type === 'add') {
            if (data[target].next.length === 1) {
                if (Math.round(Math.random())) {
                    const newData = addNode(data, target, createNewNode());
                    setData(newData);
                } else {
                    const newData = addBranch(data, target, [createNewNode(), createNewNode()]);
                    setData(newData);
                }
            } else {
                const newData = addNode(data, target, createNewNode());
                setData(newData);
            }
        } else if (type === 'expandBranch') {
            const newData = expandBranch(data, target, [createNewNode()]);
            setData(newData);
        } else if (type === 'combineNodes') {
            const newData = combineNodes(data, target, createNewNode());
            setData(newData);
        } else if (type === 'deleteNode') {
            const newData = deleteNode(data, target);
            setData(newData);
        } else if (type === 'addBranch') {
            const newData = addBranch(data, target, [createNewNode(), createNewNode()]);
            setData(newData);
        } else if (type === 'addNode') {
                const newData = addNode(data, target, createNewNode());
                setData(newData);   
        }
    }, []);

    return (
        <div className="flowchart-container">
            <FlowChart
                onChange={onChange}
                headNodeId= 'head'
            />
        </div>
    );
```