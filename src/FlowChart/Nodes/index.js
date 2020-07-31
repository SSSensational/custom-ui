/* eslint-disable */
import React from 'react';
import styles from './index.module.css';
//Type types = 'time' | 'write' | 'audit' | 'record' | 'send' | 'work' |'operation' | 'condition' | 'end';

const backgroundMap = {
    time: '#2196f3',
    write: '#f759ab',
    send: '#00ffff',
    audit: '#7e57c2',
    record: '#ffa340',
    work: '#01ca83',
    operation: '#4c7d9e'
}

const IconMap = {
    time: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14455" width="40" height="40"><path d="M690.43953 332.921415 503.821225 519.578606 381.0736 396.825864c-8.740058-8.739035-22.946618-8.739035-31.686676 0-8.740058 8.741082-8.740058 22.948665 0 31.6877l122.753765 122.749672-35.180244 35.17922c-8.741082 8.741082-8.741082 22.949688 0 31.6877 8.739035 8.734942 22.942525 8.734942 31.68156 0l35.17922-35.17922 35.722596 35.716456c8.734942 8.738012 22.942525 8.738012 31.682583 0 8.740058-8.740058 8.740058-22.948665 0-31.68463l-35.716456-35.719526 186.612165-186.612165c8.740058-8.740058 8.740058-22.947641 0-31.6877C713.382055 324.180334 699.174472 324.180334 690.43953 332.921415L690.43953 332.921415zM510.544347 62.365396c-247.517303 0-448.158996 200.64067-448.158996 448.158996 0 247.517303 200.64067 448.16002 448.158996 448.16002 247.51935 0 448.161043-200.641693 448.161043-448.16002C958.70539 263.006066 758.063697 62.365396 510.544347 62.365396L510.544347 62.365396zM532.951683 912.39004 532.951683 801.826921c0-12.367679-10.037611-22.406313-22.407336-22.406313-12.368702 0-22.406313 10.038634-22.406313 22.406313l0 110.563118C284.718065 901.050784 119.031489 737.337141 108.453572 532.930705l110.789269 0c12.368702 0 22.406313-10.037611 22.406313-22.406313s-10.037611-22.406313-22.406313-22.406313L108.680746 488.11808c12.326746-202.973808 177.245843-368.076076 379.458311-379.595434l0 110.699218c0 12.368702 10.037611 22.406313 22.406313 22.406313 12.370749 0 22.407336-10.038634 22.407336-22.406313L532.952706 108.569718c202.258517 11.519358 367.177614 176.621627 379.505383 379.548362L801.847899 488.11808c-12.369725 0-22.406313 10.038634-22.406313 22.406313s10.037611 22.406313 22.406313 22.406313l110.789269 0C902.058229 737.337141 736.372675 901.050784 532.951683 912.39004L532.951683 912.39004zM532.951683 912.39004" p-id="14456" fill="#2196f3"></path></svg>,
    write: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15994" width="40" height="40"><path d="M343.207178 559.224558c-0.584308 0.74599-1.167592 1.523703-1.427512 2.465145l-45.016263 165.04394c-2.629897 9.608845 0.064468 19.961634 7.173376 27.262924 5.323239 5.192256 12.33391 8.049327 19.798928 8.049327 2.466168 0 4.932336-0.291642 7.366781-0.942465l163.873278-44.692898c0.261966 0 0.391926 0.228197 0.585331 0.228197 1.882883 0 3.733021-0.681522 5.129834-2.111081L938.887019 276.393981c13.016455-13.030781 20.156062-30.78412 20.156062-50.096978 0-21.892613-9.283434-43.767829-25.544793-59.98007l-41.382503-41.446971c-16.226566-16.261359-38.135552-25.560142-60.012815-25.560142-19.308765 0-37.063127 7.141654-50.113351 20.138666L343.855954 557.698808C343.403652 558.118364 343.532589 558.736441 343.207178 559.224558M896.010489 233.486752l-43.524283 43.493583-70.560032-71.681576 42.909276-42.908252c6.783497-6.815219 19.927865-5.824659 27.717272 1.995447l41.412179 41.447994c4.321422 4.317329 6.785543 10.061147 6.785543 15.740496C900.718721 226.234581 899.060965 230.453672 896.010489 233.486752M421.137061 566.105269l316.191382-316.211848 70.596871 71.730695L492.316194 637.21584 421.137061 566.105269zM363.525945 694.308139l22.849404-83.869153 60.953234 60.95528L363.525945 694.308139zM923.762553 407.114185c-16.585747 0-30.18651 13.486152-30.248931 30.29805l0 408.484392c0 21.421892-17.398252 38.819121-38.85289 38.819121L163.658895 884.715747c-21.420869 0-38.884612-17.396205-38.884612-38.819121L124.774283 179.170682c0-21.439288 17.46272-38.850843 38.884612-38.850843l445.046099 0c16.680914 0 30.218232-13.549597 30.218232-30.234605 0-16.649192-13.537318-30.216185-30.218232-30.216185L159.049924 79.869049c-52.222385 0-94.725408 42.470277-94.725408 94.725408l0 675.913187c0 52.254108 42.504046 94.709035 94.725408 94.709035l700.18601 0c52.258201 0 94.743828-42.453904 94.743828-94.709035L953.979762 437.217806C953.912224 420.600337 940.3483 407.114185 923.762553 407.114185" p-id="15995" fill="#f759ab"></path></svg>,
    send: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16939" width="40" height="40"><path d="M85.333333 896l896-384L85.333333 128v298.666667l640 85.333333-640 85.333333z" p-id="16940" fill="#00ffff"></path></svg>,
    audit: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17692" width="40" height="40"><path d="M265.142857 212.571429c-5.028571 0-9.142857 4.114286-9.142857 9.142857v54.857143c0 5.028571 4.114286 9.142857 9.142857 9.142857h438.857143c5.028571 0 9.142857-4.114286 9.142857-9.142857v-54.857143c0-5.028571-4.114286-9.142857-9.142857-9.142857H265.142857z m210.285714 164.571428H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v54.857143c0 5.028571 4.114286 9.142857 9.142857 9.142857h210.285714c5.028571 0 9.142857-4.114286 9.142858-9.142857v-54.857143c0-5.028571-4.114286-9.142857-9.142858-9.142857z m-54.857142 523.428572H164.571429V96h640v365.714286c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V50.285714c0-20.228571-16.342857-36.571429-36.571429-36.571428H118.857143c-20.228571 0-36.571429 16.342857-36.571429 36.571428v896c0 20.228571 16.342857 36.571429 36.571429 36.571429h301.714286c5.028571 0 9.142857-4.114286 9.142857-9.142857v-64c0-5.028571-4.114286-9.142857-9.142857-9.142857z m502.857142-100.571429H758.857143v-41.828571c52.914286-15.771429 91.428571-64.685714 91.428571-122.742858 0-70.742857-57.257143-128-128-128s-128 57.257143-128 128c0 57.942857 38.514286 106.971429 91.428572 122.742858V800H521.142857c-10.057143 0-18.285714 8.228571-18.285714 18.285714v173.714286c0 10.057143 8.228571 18.285714 18.285714 18.285714h402.285714c10.057143 0 18.285714-8.228571 18.285715-18.285714V818.285714c0-10.057143-8.228571-18.285714-18.285715-18.285714zM665.142857 635.428571c0-31.542857 25.6-57.142857 57.142857-57.142857s57.142857 25.6 57.142857 57.142857-25.6 57.142857-57.142857 57.142858-57.142857-25.6-57.142857-57.142858z m205.714286 304H573.714286v-68.571428h297.142857v68.571428z" p-id="17693" fill="#7e57c2"></path></svg>,
    record: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18899" width="40" height="40"><path d="M822.857143 201.142857h-73.142857a18.285714 18.285714 0 1 1 0-36.571428H841.142857a18.285714 18.285714 0 0 1 18.285714 18.285714v694.857143a18.285714 18.285714 0 0 1-18.285714 18.285714H182.857143a18.285714 18.285714 0 0 1-18.285714-18.285714V182.857143a18.285714 18.285714 0 0 1 18.285714-18.285714h91.428571a18.285714 18.285714 0 0 1 0 36.571428h-73.142857v658.285714h621.714286v-658.285714zM365.714286 128h292.571428a18.285714 18.285714 0 0 1 18.285715 18.285714v109.714286a18.285714 18.285714 0 0 1-18.285715 18.285714h-292.571428a18.285714 18.285714 0 0 1-18.285715-18.285714V146.285714a18.285714 18.285714 0 0 1 18.285715-18.285714z m18.285714 36.571429v73.142857h256v-73.142857h-256z m-18.285714 365.714285a18.285714 18.285714 0 1 1 0-36.571428h292.571428a18.285714 18.285714 0 1 1 0 36.571428h-292.571428z m0 146.285715a18.285714 18.285714 0 1 1 0-36.571429h292.571428a18.285714 18.285714 0 1 1 0 36.571429h-292.571428z" p-id="18900" fill="#ffa340"></path></svg>,
    work: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21625" width="40" height="40"><path d="M1012.224 252.416L760.832 12.8c-6.144-5.632-13.312-8.704-21.504-8.704h-465.92c-47.616 0-86.016 38.4-86.016 86.016v177.664H87.552C40.448 267.776 2.56 305.664 2.56 352.768v439.296c0 47.104 37.888 84.992 84.992 84.992h99.84v57.344c0 47.616 38.4 86.016 86.016 86.016h662.016c47.616 0 86.016-38.4 86.016-86.016V274.944c0-8.704-3.072-16.384-9.216-22.528z m-256.512-159.744l167.424 159.232-167.424-4.608V92.672zM87.552 815.616c-12.8 0-23.552-10.752-23.552-23.552V352.256c0-12.8 10.752-23.552 23.552-23.552H522.24c12.8 0 23.552 10.752 23.552 23.552v439.296c0 12.8-10.752 23.552-23.552 23.552H87.552z m872.448 118.272c0 13.312-11.264 24.576-24.576 24.576H273.408c-13.312 0-24.576-11.264-24.576-24.576v-57.344H522.24c47.104 0 84.992-37.888 84.992-84.992v-53.248h143.36c16.896 0 30.72-13.824 30.72-30.72s-13.824-30.72-30.72-30.72h-143.36v-81.92h143.36c16.896 0 30.72-13.824 30.72-30.72s-13.824-30.72-30.72-30.72h-143.36v-81.92h143.36c16.896 0 30.72-13.824 30.72-30.72s-13.824-30.72-30.72-30.72h-143.36v-37.888c0-47.104-37.888-84.992-84.992-84.992H248.832V89.6c0-13.312 11.264-24.576 24.576-24.576h420.864v212.48c0 16.896 12.8 30.208 29.696 30.72l236.032 6.144v619.52z" fill="#01ca83" p-id="21626"></path><path d="M391.68 589.824l-42.496-112.128H268.8l-41.984 112.128-29.184-112.128H116.736l60.928 200.192H261.12l48.128-125.952 48.128 125.952h83.456l60.416-200.192H420.864z" fill="#01ca83" p-id="21627"></path></svg>,
    operation: <svg className={styles.nodeIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22625" width="40" height="40"><path d="M571.178667 643.328a144 144 0 0 1-189.098667-193.450667l77.781333 77.866667a48 48 0 1 0 67.882667-67.84l-77.824-77.909333a144 144 0 0 1 193.450667 189.141333l226.517333 207.061333a64.896 64.896 0 1 1-91.690667 91.690667l-207.018666-226.56z m51.498666 134.656a288.298667 288.298667 0 0 1-38.656 12.928v95.488c0 5.290667-4.309333 9.6-9.642666 9.6h-124.757334a9.6 9.6 0 0 1-9.6-9.6v-95.488a286.293333 286.293333 0 0 1-74.325333-30.805333l-67.541333 67.541333a9.6 9.6 0 0 1-13.568 0L196.352 739.413333a9.6 9.6 0 0 1 0-13.568l67.541333-67.541333a286.293333 286.293333 0 0 1-30.805333-74.325333H137.6A9.6 9.6 0 0 1 128 574.378667v-124.757334c0-5.290667 4.309333-9.6 9.6-9.6h95.488c6.826667-26.453333 17.28-51.370667 30.805333-74.325333L196.352 298.154667a9.6 9.6 0 0 1 0-13.568L284.586667 196.352a9.6 9.6 0 0 1 13.568 0l67.541333 67.498667a287.146667 287.146667 0 0 1 74.325333-30.848V137.6c0-5.290667 4.266667-9.6 9.6-9.6h124.8c5.248 0 9.6 4.309333 9.6 9.6v95.488c26.368 6.826667 51.328 17.28 74.282667 30.805333l67.541333-67.541333a9.6 9.6 0 0 1 13.568 0l88.234667 88.234667a9.6 9.6 0 0 1 0 13.568l-67.498667 67.541333a287.146667 287.146667 0 0 1 30.848 74.282667h95.402667c5.290667 0 9.6 4.352 9.6 9.642666v124.757334c0 5.333333-4.266667 9.6-9.6 9.6h-95.488c-4.693333 18.133333-11.178667 35.754667-19.328 52.650666a9.6 9.6 0 0 1-15.018667 2.986667l-10.112-9.173333-38.314666-34.261334-12.16-10.88a9.6 9.6 0 0 1-2.688-10.24A192.298667 192.298667 0 0 0 512 320a192 192 0 1 0 63.018667 373.333333 9.6 9.6 0 0 1 10.24 2.645334l10.837333 12.074666 35.285333 39.338667 8.149334 9.130667a9.6 9.6 0 0 1-2.901334 15.061333 283.306667 283.306667 0 0 1-13.952 6.4z" p-id="22626" fill="#4c7d9e"></path></svg>
}

const Temp = (
    <div className={styles.tempContainer}>
        选择要执行的动作
    </div>
)

const Node = ({ type, title, canDelete, onClickDeleteNode, selected, onClickAdd, ...props }) => {
    return (
        <div className={`${styles.nodeContainer} ${selected ? styles.selected : ''}`} style={{ marginTop: 22 }} /* marginTop为头部Icon高度 */>
            {canDelete && <svg className={styles.deleteIcon} onClick={onClickDeleteNode} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26147" width="28" height="28"><path className={styles.deleteFill} d="M925.32 339.09a448.88 448.88 0 1 0 35.18 174.2 446 446 0 0 0-35.18-174.2z" fill="#cccccc" p-id="26148" data-spm-anchor-id="a313x.7781069.0.i100"></path><path d="M552.6 514.24l140-140a28 28 0 0 0 0-39.6 28 28 0 0 0-39.6 0l-140 140-140-140a28 28 0 0 0-39.6 0 28 28 0 0 0 0 39.6l140 140-140 140a28 28 0 0 0 0 39.6 28 28 0 0 0 39.6 0l140-140 140 140a28 28 0 1 0 39.6-39.6z" fill="#ffffff" p-id="26149" data-spm-anchor-id="a313x.7781069.0.i99" className="selected"></path></svg>}
            <div className={styles.nodeIconContainer}>{IconMap[type]}</div>
            <div className={styles.nodeTitle} style={{ backgroundColor: backgroundMap[type] }}>{title}</div>
            <div className={styles.nodeContent} onClick={onClickAdd}>设置此节点</div>
        </div>
    );
}

const Condition = ({ canDelete, onClickDeleteNode, selected, ...props }) => {
    return (
        <div className={`${styles.nodeContainer} ${selected ? styles.selected : ''}`}>
            {canDelete && <svg className={styles.deleteIcon} onClick={onClickDeleteNode} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26147" width="28" height="28"><path className={styles.deleteFill} d="M925.32 339.09a448.88 448.88 0 1 0 35.18 174.2 446 446 0 0 0-35.18-174.2z" fill="#cccccc" p-id="26148" data-spm-anchor-id="a313x.7781069.0.i100"></path><path d="M552.6 514.24l140-140a28 28 0 0 0 0-39.6 28 28 0 0 0-39.6 0l-140 140-140-140a28 28 0 0 0-39.6 0 28 28 0 0 0 0 39.6l140 140-140 140a28 28 0 0 0 0 39.6 28 28 0 0 0 39.6 0l140-140 140 140a28 28 0 1 0 39.6-39.6z" fill="#ffffff" p-id="26149" data-spm-anchor-id="a313x.7781069.0.i99" className="selected"></path></svg>}
            <div className={styles.conditionTitle}>所有数据可进入该分支</div>
            <div className={styles.nodeContent}>设置筛选条件</div>
        </div>
    );
}

const Start = (props) => {
    return (
        <div className={styles.endContainer}>
            <div className={styles.endText}>流程开始</div>
            <svg className={styles.startIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3478" width="48" height="48"><path fill="#40a9ff" d="M149.989688 874.093352a509.948138 509.948138 0 1 0-109.714286-162.700613 513.206978 513.206978 0 0 0 109.714286 162.700613z" p-id="3479" data-spm-anchor-id="a313x.7781069.0.i2"></path><path d="M429.646454 687.977369a57.331447 57.331447 0 0 0 27.277699 7.000472 60.348892 60.348892 0 0 0 32.829797-10.017916l175.977369-115.990571a68.677039 68.677039 0 0 0 30.777935-58.055634 66.504479 66.504479 0 0 0-29.812353-56.486563l-177.54644-115.749175a57.934936 57.934936 0 0 0-60.348892-3.017445 67.832155 67.832155 0 0 0-33.312588 60.348893V627.628477a67.470061 67.470061 0 0 0 34.157473 60.348892z" fill="#ffffff" p-id="3480" data-spm-anchor-id="a313x.7781069.0.i3" ></path></svg>
        </div>
    );
}

const End = (props) => {
    return (
        <div className={styles.endContainer}>
            <svg className={styles.endIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12699" width="48" height="48"><path fill="#ff4d4f" d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM256 426.688a85.312 85.312 0 1 0 0 170.624h512a85.312 85.312 0 1 0 0-170.624H256z" p-id="12700" ></path></svg>
            <div className={styles.endText}>流程结束</div>
        </div>
    );
}

const Render = (props) => {
    if (props.type === 'condition') return <Condition {...props} />
    else if (props.type === 'start') return <Start {...props} />
    else if (props.type === 'end') return <End {...props} />
    else if (props.type === 'temp') return Temp;
    else return <Node {...props} />;
}

export default Render;