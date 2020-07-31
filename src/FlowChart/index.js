/* eslint-disable */
import React, { createContext, useContext, useRef, useEffect, useCallback } from 'react';
import styles from './index.module.css';
import { getCombineNode } from './util';
export { addNode, addBranch, expandBranch, combineNodes, deleteNode } from './util';
const Context = createContext();

const Node = ({ headSection, tailSection, node, heightest, nodeRef, headNode, tailNode, branchNode }) => {
    const { Render, next, pre, id, ...customProps } = node;
    const { data, config, backgroundColor, onChange, showAddButton, showBranchButton, RenderAddButton, RenderBranchButton, RenderNode, ...otherProps } = useContext(Context);
    const { distance, lineWidth, lineColor, brotherNodeAlign } = config;
    const RenderChoose = Render || RenderNode; // 节点自身属性Render的优先级比FlowChart的RenderNode属性优先级高
    if (!id) throw new Error('存在节点无id属性');
    if (!RenderChoose) throw new Error('未设置全局的RenderNode或者未给每个节点设置自身Render');

    const nextSectionData = next && next.map(nodeId => data[nodeId]).filter(node => node.pre.length === 1); /* 10-只有后继节点不是分支时才渲染 */

    useEffect(() => {  /* 9-统计兄弟节点的最大高度，　默认是上对齐所以不做耗时操作 */
        if (brotherNodeAlign === 'top' || !branchNode) return;
        const nodeHeight = nodeRef.current.get(id).clientHeight;
        if (nodeHeight > heightest.current) heightest.current = nodeHeight;
    });

    const onClickAdd = useCallback(() => {
        if (!onChange) return;
        onChange({ type: 'add', target: id });
    }, [id, onChange]);

    const onClickAddNode = useCallback(() => {
        if (!onChange) return;
        onChange({ type: 'addNode', target: id });
    }, [id, onChange]);

    const onClickAddBranch = useCallback(() => {
        if (!onChange) return;
        onChange({ type: 'addBranch', target: id });
    }, [id, onChange]);

    const onClickDeleteNode = useCallback(() => {
        if (!onChange) return;
        onChange({ type: 'deleteNode', target: id });
    }, [id, onChange]);

    const onClickExpandBranch = useCallback(() => {
        if (!onChange) return;
        onChange({ type: 'expandBranch', target: id });
    }, [id, onChange]);

    return (
        <div className={styles.nodeContainer} style={{ margin: `0 0 0 ${headNode ? 0 : distance.horizontal}px` }}>
            {branchNode && /* 8-当前节点为分支节点时，掩盖所属Section多余四角的线 */
                <>
                    {tailNode && <div style={{ width: `calc(50% - ${lineWidth}px)`, height: lineWidth, backgroundColor, position: 'absolute', boxShadow: `${lineWidth * -.6 }px 0 0 0 ${backgroundColor}`, right: 0, top: 0, zIndex: 1 }}/>}
                    {tailNode && <div style={{ width: `calc(50% - ${lineWidth}px)`, height: lineWidth, backgroundColor, position: 'absolute', boxShadow: `${lineWidth * -.6 }px 0 0 0 ${backgroundColor}`, right: 0, bottom: 0, zIndex: 1 }}/>}
                    {headNode && <div style={{ width: `calc(50% - ${lineWidth}px)`, height: lineWidth, backgroundColor, position: 'absolute', boxShadow: `${lineWidth * .6 }px 0 0 0 ${backgroundColor}`, left: 0, top: 0, zIndex: 1 }}/>}
                    {headNode && <div style={{ width: `calc(50% - ${lineWidth}px)`, height: lineWidth, backgroundColor, position: 'absolute', boxShadow: `${lineWidth * .6 }px 0 0 0 ${backgroundColor}`, left: 0, bottom: 0, zIndex: 1 }}/>}
                </>
            }
            {next && <div style={{ width: lineWidth, height: '100%', backgroundColor: lineColor, position: "absolute", transform: 'scale(1.001)' }}/> /* 8-补充 */} 
            {!headSection && node.pre.length === 1 && <div style={{ width: lineWidth, height: distance.vertical, backgroundColor: lineColor, transform: 'scale(1.001)' }}/> /* 4-节点向上实线 */} 
            <div className={styles.nodeBox} ref={ref => nodeRef.current.set(id, ref)} style={{ justifyContent: brotherNodeAlign === 'center' ? 'center' : brotherNodeAlign === 'bottom' ? 'flex-end' : 'flex-start'}}>
                {<div style={{ width: lineWidth, height: '100%', backgroundColor: lineColor, position: "absolute", transform: 'scale(1.001)' }}/> /* 8-补充 */} 
                {showBranchButton && node.next && node.next.length > 1 &&  // 5-归属节点的Branch按钮,　因为Render容器NodeBox有高度差，所以为其子代
                    <div className={styles.btn} style={{ bottom: `${-2 * distance.vertical}px` }} onClick={onClickExpandBranch}>
                        {RenderBranchButton ? typeof RenderBranchButton === 'function' ? <RenderBranchButton /> : RenderBranchButton :
                            <svg t="1583467705713" className={styles.btnIcon} style={{backgroundColor}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32951" width="24" height="24"><path d="M682.666667 955.733333H170.666667c-66.030933 0-102.4-36.369067-102.4-102.4V341.333333c0-66.030933 36.369067-102.4 102.4-102.4h68.266666v-68.266666c0-66.030933 36.369067-102.4 102.4-102.4h512c66.030933 0 102.4 36.369067 102.4 102.4v512c0 66.030933-36.369067 102.4-102.4 102.4h-68.266666v68.266666c0 66.030933-36.369067 102.4-102.4 102.4zM170.666667 273.066667c-47.223467 0-68.266667 21.0432-68.266667 68.266666v512c0 47.223467 21.0432 68.266667 68.266667 68.266667h512c47.223467 0 68.266667-21.0432 68.266666-68.266667v-68.266666H341.333333c-66.030933 0-102.4-36.369067-102.4-102.4V273.066667h-68.266666z m597.333333 477.866666h85.333333c47.223467 0 68.266667-21.0432 68.266667-68.266666V170.666667c0-47.223467-21.0432-68.266667-68.266667-68.266667H341.333333c-47.223467 0-68.266667 21.0432-68.266666 68.266667v512c0 47.223467 21.0432 68.266667 68.266666 68.266666h426.666667z" p-id="32952" fill="#1890ff"></path><path d="M597.333333 631.466667a34.133333 34.133333 0 0 1-34.133333-34.133334v-136.533333h-136.533333a34.133333 34.133333 0 0 1 0-68.266667h136.533333v-136.533333a34.133333 34.133333 0 0 1 68.266667 0v136.533333h136.533333a34.133333 34.133333 0 0 1 0 68.266667h-136.533333v136.533333a34.133333 34.133333 0 0 1-34.133334 34.133334z" p-id="32953" fill="#1890ff"></path></svg>
                        }
                    </div>
                }
                <div style={{ position: 'relative' }}> 
                    {showAddButton && !tailSection && // 5-归属节点的Add按钮， 因为要紧贴Render， 所以在外套了层等宽高的相对定位容器，来定位Add按钮
                        <div className={styles.btn} style={{ bottom: `${-distance.vertical}px` }} onClick={onClickAdd}>
                            {RenderAddButton ? typeof RenderAddButton === 'function' ? <RenderAddButton /> : RenderAddButton :
                                <svg t="1583467872288" className={styles.btnIcon} style={{backgroundColor}} fill="#ffc53d" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33378" width="24" height="24"><path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m238.08 570.88h-179.2v179.2c0 32.768-26.112 58.88-58.88 58.88s-58.88-26.112-58.88-58.88v-179.2h-179.2c-32.768 0-58.88-26.112-58.88-58.88s26.112-58.88 58.88-58.88h179.2v-179.2c0-32.768 26.112-58.88 58.88-58.88s58.88 26.112 58.88 58.88v179.2h179.2c32.768 0 58.88 26.112 58.88 58.88s-26.112 58.88-58.88 58.88z" p-id="33379"></path></svg>
                            }
                        </div>
                    }
                    {typeof RenderChoose === 'function' ? // Node-Render
                        <RenderChoose
                            id={id}
                            {...customProps}
                            onClickAdd={onClickAdd}
                            onClickAddNode={onClickAddNode}
                            onClickDeleteNode={onClickDeleteNode}
                            onClickAddBranch={onClickAddBranch}
                            canAddBranch={next && next.length === 1}
                            canDelete={pre && next && !(pre.length > 1 && next.length > 1)}
                            {...otherProps}
                        /> 
                            : RenderChoose
                    }
                </div>
            </div>
            {!tailSection && <div style={{ width: lineWidth, height: distance.vertical * (next.length === 1 && data[next[0]].pre.length === 1 ? 1 : 2), backgroundColor: lineColor, transform: 'scale(1.001)'}}/> /* 4-节点向下实线 */} 
            {nextSectionData && nextSectionData.length > 0 && <Section nodes={nextSectionData} /> /* 3-后继节点(10-只有后继节点不是分支时才渲染) */} 
        </div>
    );
};

function Section({ nodes, headSection }) {
    const heightest = useRef(0); /* 9-统计兄弟节点的最大高度 */
    const nodeRef = useRef(new Map()); /* 9-统计兄弟节点的最大高度 */
    const { data, config, nextSectionDuplicate, onChange, backgroundColor, showCombineButton, RenderCombineButton } = useContext(Context);
    const { distance, lineWidth, lineColor, brotherNodeAlign, padding } = config;

    useEffect(() => { /* 9-统计兄弟节点的最大高度，　默认是上对齐所以不做耗时操作 */
        if (brotherNodeAlign === 'top' || nodes.length === 1) return;
        for (let node of nodeRef.current.values()) if (node) node.style.height = `${heightest.current}px`;
    });

    const onClickCombineNodes = () => {
        if (!onChange) return;
        onChange({ type: 'combineNodes', target: nodes.map(node => node.id) });
    };

    if (!nodes) return null;
    const tailSection = !nodes[0].next;
    const combineNode = nodes.length > 1 ? getCombineNode(data, nodes, nextSectionDuplicate) : null; /* 10-当前Section产生分支时，渲染后续收束节点 */
    const nextSectionData = combineNode ? [combineNode] : null;
    
    return (
        <>
            <div className={styles.sectionContainer} style={{ backgroundColor, margin: headSection ? '0 auto' : 'unset', paddingRight: headSection && padding.right ? padding.right : 'unset' } /* 8补充-背景色覆盖父Node节点的向下长线 */}>
                {nodes && nodes.map((node, index) =>
                    <Node
                        key={node.id}
                        node={node}
                        tailSection={tailSection}
                        headSection={headSection}
                        heightest={heightest}
                        nodeRef={nodeRef}
                        branchNode={nodes.length > 1}
                        headNode={index === 0}
                        tailNode={index === nodes.length - 1}
                    />
                )}
                {!headSection && !tailSection && nodes && nodes.length > 1 && /* 7-Section产生分支时兄弟节点间的连线 */
                    <>
                        <div style={{ width: '100%', height: lineWidth, backgroundColor: lineColor, position: 'absolute', top: 0 }}/>
                        <div style={{ width: '100%', height: lineWidth, backgroundColor: lineColor, position: 'absolute', bottom: 0 }}/>
                    </>
                }
                {showCombineButton && nodes.length > 1 && /* 6-Section产生分支时添加收束节点的combine按钮 */
                    <div className={styles.btn} style={{ bottom: `${-distance.vertical}px` }} onClick={onClickCombineNodes}>
                        {RenderCombineButton ? typeof RenderCombineButton === 'function' ? <RenderCombineButton /> : RenderCombineButton :
                            <svg t="1583467568452" className={styles.btnIcon} style={{backgroundColor}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31396" width="24" height="24"><path d="M859.859128 62.037938 163.077657 62.037938c-54.776557 0-99.540064 44.89142-99.540064 99.714026l0 698.001251c0 54.822606 44.76453 99.713003 99.540064 99.713003l696.78147 0c54.775534 0 99.539041-44.890396 99.539041-99.713003L959.398168 161.751964C959.399191 106.928335 914.635685 62.037938 859.859128 62.037938zM760.319064 560.608068 561.238936 560.608068l0 199.430098L461.698872 760.038166 461.698872 560.608068 262.617721 560.608068l0-99.714026L461.698872 460.894042 461.698872 261.46599l99.540064 0 0 199.428052 199.080128 0L760.319064 560.608068z" p-id="31397" fill="#BC8F8F"></path></svg>
                        }
                    </div>
                }
            </div>
            {nodes.length > 1 && <div style={{ width: lineWidth, height: distance.vertical * 2, backgroundColor: lineColor }} /> /* 6-Section产生分支时出现的向下实线 */}
            {nextSectionData && nextSectionData.length > 0 && <Section nodes={nextSectionData} /> /* 10-当前Section产生分支时，渲染后续收束节点 */}
        </>
    );
}


function FlowChart({ data, headNodeId, config, ...props }) {
    if (!headNodeId) throw new Error('未指定 headNodeId');
    if (!data instanceof Object || !data[headNodeId] || !data[headNodeId].next) throw new Error('data格式不对');
    const nextSectionDuplicate = {}; // 12-多分支共享同一个收束节点标记，每次FlowChart有新数据时得重置，所以放在这

    const wrapper = useRef(null);
    
    const handleMouseMove = useCallback((event) => {
        if (wrapper && wrapper.current) {
            wrapper.current.scrollLeft -= event.movementX;
            wrapper.current.scrollTop -= event.movementY;
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Context.Provider value={{ data, nextSectionDuplicate, config, ...props }}>
            <div
                className={styles.chartContainer}
                style={{ padding: `${config.padding.top || 0}px 0 ${config.padding.bottom || 0}px ${config.padding.left || 0}px` }}
                ref={wrapper}
                onMouseDown={handleMouseDown}
            >
                <Section nodes={[data[headNodeId]]} headSection/>
            </div>
        </Context.Provider>
    );
}

FlowChart.defaultProps = {
    config: {
        lineWidth: 1,
        lineColor: '#ccc',
        distance: { horizontal: 50, vertical: 40 },
        padding: { top: 24, left: 36, right: 36, bottom: 24 },
        brotherNodeAlign: 'center'
    },
    backgroundColor: '#f1f1f1',
    showAddButton: true,
    showBranchButton: true,
    showCombineButton: true,
}

export default FlowChart;
