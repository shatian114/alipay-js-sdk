// Type definitions for alipay jssdk 3.1.1
// Project: https://myjsapi.alipay.com/alipayjsapi/index.html
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace ap {
  /**
   * 通用类型定义
   */

  /**
   * 通用回调
   */
  type commonCallback = () => void;

  /**
   * 通用成功回调
   */

  type commonSuccess = (params: any) => void;

  /**
   *
   * @param params 通用失败回调
   */
  type commonFail = (params: { error: number; errorMessage: string }) => void;

  /**
   *  websocket
   *  */

  // 连接
  function connectSocket(
    option: { url: string; data?: Object; headers?: Object } | string,
    callback?: commonCallback
  );

  // 连接成功回调
  function onSocketOpen(callback: commonCallback): void;

  // 连接关闭回调
  function onSocketClose(callback: commonCallback): void;

  // 报错回调
  function onSocketError(callback: commonCallback): void;

  // 接收到消息
  function onSocketMessage(
    fn: (res: { data: string | ArrayBuffer }) => void
  ): void;

  // 发送数据
  function sendSocketMessage(
    option: {
      data: string | ArrayBuffer;
    },
    callback?: (res: any) => void
  ): void;

  // 关闭连接
  function closeSocket(): void;

  // 移除 WebSocket 打开事件监听。
  function offSocketOpen(callback?: commonCallback): void;

  // 移除 WebSocket 关闭事件监听。
  function offSocketClose(callback?: commonCallback): void;

  // 移除 WebSocket 报错事件监听。
  function offSocketError(callback?: commonCallback): void;

  // 移除 WebSocket 消息事件监听。
  function offSocketMessage(callback?: commonCallback): void;

  /**
   * 数据存储
   */

  // 写入会话级数据。可直接传入一个对象作为 OPTION.data 参数。
  function setSessionData(option: { data: Object });

  // 读取会话级数据。可用于页面间传递数据。
  // 可直接传入一个数组作为 OPTION.keys，或直接传入一个字符串，作为 OPTION.keys 数组中的某一个 key。
  function getSessionData(
    option: { keys: string[] } | string[],
    string,
    callback: (res: { data: Object }) => void
  ): void;

  /**
   *  URL参数
   */

  // 把 URL 中的 queryString 解析成一个对象。
  function parseQueryString(queryString?: string): Object;

  /**
   * 图片
   */

  // 拍照或从手机相册中选择图片。可直接传入一个数字作为 OPTION.count 参数。
  function chooseImage(
    option:
      | {
          count?: number;
          sourceType?: string[];
          fail: commonFail;
        }
      | number,
    callback: (res: { apFilePaths: string[] }) => void
  ): void;

  // 预览图片。可直接传入一个图片链接数组作为 OPTION.urls 参数。
  function previewImage(
    option:
      | {
          urls: string[];
          current?: number;
        }
      | string[],
    fn: commonCallback
  ): void;

  /**
   * 视频
   */

  // 录制或从手机相册中选择视频。可直接传入一个数字作为 OPTION.maxDuration 参数。
  type cameraSourceType = "camera" | "camera";
  type cameraType = "front" | "back";
  function chooseVideo(
    option:
      | {
          maxDuration?: number;
          sourceType?: string[];
          camera?: string[];
          fail?: commonFail;
        }
      | number,
    callback: (res: {
      apFilePath: string;
      duration: number;
      size: number;
      width: number;
      height: number;
    }) => void
  ): void;

  /**
   * 音乐播放
   */

  // 开始播放音乐。
  function playBackgroundAudio(
    option: {
      url: string;
      title?: string;
      singer?: string;
      describe?: string;
      logo?: string;
      cover?: string;
      fail?: commonFail;
    },
    callback?: commonCallback
  );

  // 暂停播放音乐。
  function pauseBackgroundAudio(): void;

  // 控制音乐播放进度。
  function seekBackgroundAudio(
    option: { position: number; fail?: commonFail },
    callback: commonCallback
  ): void;

  // 停止播放音乐。
  function stopBackgroundAudio(): void;

  // 获取音乐播放的状态。
  function getBackgroundAudioPlayerState(
    callback: (params: {
      status: number;
      duration: number;
      currentPosition: number;
      downloadPercent: number;
      url: string;
    }) => void
  ): void;

  // 监听音乐播放事件。
  function onBackgroundAudioPlay(callback: commonCallback): void;

  // 监听音乐暂停事件。
  function onBackgroundAudioPause(callback: commonCallback): void;

  // 监听音乐停止事件。
  function onBackgroundAudioStop(callback: commonCallback): void;

  // 移除音乐播放事件的监听。
  function offBackgroundAudioPlay(callback: commonCallback): void;

  // 移除音乐暂停事件的监听。
  function offBackgroundAudioPause(callback: commonCallback): void;

  // 移除音乐停止事件的监听。
  function offBackgroundAudioStop(callback: commonCallback): void;

  /**
   * 位置
   *
   */

  // 获取当前的地理位置信息。
  // ap.getLocation使用的是高德坐标系，关于高德坐标系及与其他地图坐标系差异详见http://lbs.amap.com/faq/top/coordinate
  type locationType = 0 | 1 | 2;
  function getLocation(
    option: {
      cacheTimeout?: number; // 钱包经纬度定位缓存过期时间，单位秒。默认 30s。使用缓存会加快定位速度，缓存过期会重新定位
      type?: locationType; // 支持 0：详细逆地理编码，带周边信；1：逆地理编码到城市；2：仅获取经纬度、速度和精度。默认为 2
      timeout?: number; // 定位超时失败回调时间，单位秒。默认10s
      bizType?: string; // 自定义业务类型
    },
    callback: (res: {
      longitude: string; // 经度
      latitude: string; // 纬度
      accuracy: number; // 精度，单位米
      speed: number; // 速度，单位毫秒
      country: string; // 国家
      countryCode: string; // 国家编号
      province: string; // 省份
      city: string; // 城市
      cityCode: string; // 城市编码
      adCode: string; // 区域编码
      streetNumber: Array<Object>; // 	街道门牌信息，结构是：{street, number}
      pois: Array<Object>; // 定位点附近的 POI 信息，结构是：{name, address}
    }) => void
  ): void;

  // 使用支付宝内置地图查看位置
  // ap.openLoacation使用的是高德坐标系，在使用导航功能时如果用户选择了高德之外的其他地图应用可能导致坐标偏移。关于高德坐标系及与其他地图坐标系差异详见 http://lbs.amap.com/faq/top/coordinate
  function openLocation(
    option: {
      longitude: string; // 经度
      latitude: string; // 纬度
      name?: string; // 位置名称
      address?: string; // 地址的详细说明
      scale?: number; // 	缩放比例，范围3~19，默认为15
    },
    callback?: commonCallback
  );

  /**
   * 网络状态
   */

  // 获取当前网络状态。
  type networkType =
    | "UNKNOWN"
    | "NOTREACHABLE"
    | "WIFI"
    | "3G"
    | "2G"
    | "4G"
    | "WWAN";
  function getNetworkType(
    callback: (res: {
      networkAvailable: boolean, // 网络是否可用
      networkType: networkType // 网络类型值
}) => void
  ): void;

  // 监听网络环境发生变化的事件。
  // 3G切换到4G时系统不会发出网络切换通知。 4G切到3G时，会先从4G跳到2G，然后再从2G跳3G，因此会通知两次
  function onNetworkChange(
    callback: (res: {
      networkAvailable: boolean, // 网络是否可用
      networkType: networkType // 网络类型值
}) => void
  ): void;

  // 移除网络环境发生变化事件的监听。
  function offNetworkChange(callback?: Function);

  /**
   * 扫码
   */

  // 调用扫一扫功能。
  type scanType = "qr" | "bar";
  function scan(params: {
    type?: scanType; // 扫描目标类型，支持 qr / bar，相应扫码选框会不同，默认 qr
  });

  /**
   * 摇一摇
   */

  // 摇一摇功能。每次调用API，在摇一摇手机后触发回调，如需再次监听需要再次调用这个API。
  /**
   * 示例
   * ap.watchShake(function(res){
      ap.confirm({
        content: '亲，还摇不？',
        cancelButtonText: '不摇了',
        confirmButtonText: '继续摇'
      }, function(res){
        if (res.confirm) {
          //再次调用才能继续监听摇一摇动作
          watchShake();
        }
      });
    });
   */
  function watchShake(callback: (res: any) => void): void;

  /**
   * 蓝牙
   * 蓝牙错误码表 https://myjsapi.alipay.com/alipayjsapi/device/bluetooth/errorCodes.html
   */

  // 初始化支付宝客户端的蓝牙模块。在调用支付宝蓝牙模块其它相关 API 之前，须调先调用此接口。
  type blueErrType = 12 | 13 | 14 | 15;
  function openBluetoothAdapter(params: {
    success: (res: {
      isSupportBLE: boolean; // 是否支持 BLE
    }) => void;
    fail: (res: { errorMessage: string; error: blueErrType }) => void;
  });

  // 关闭支付宝客户客户端蓝牙模块，该方法将断开所有已建立的蓝牙连接并释放系统资源。
  type blueCloseErrType = 12;
  function closeBluetoothAdapter(params: {
    success: () => void;
    fail: (res: { errorMessage: string; error: blueCloseErrType }) => void;
  });

  // 获取本机蓝牙模块状态。
  function getBluetoothAdapterState(params: {
    success: (params: {
      discovering: boolean; // 是否正在搜索设备
      available: boolean; // 蓝牙模块是否可用(需支持 BLE 并且蓝牙是打开状态)
    }) => void;
    fail: (params: { errorMessage: string; error: blueCloseErrType }) => void;
  });

  // 开始搜寻附近的蓝牙外围设备。搜索结果将在 bluetoothDeviceFound 事件中返回。可直接传入一个数组作为 OPTION.services 参数。也可直接传入一个字符串作为 OPTION.services 的第一项。
  function startBluetoothDevicesDiscovery(
    params:
      | {
          services?: string[]; // 蓝牙设备主 service 的 uuid 列表
          allowDuplicatesKey?: boolean; // 是否允许重复上报同一设备， 如果允许重复上报，则onBluetoothDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
          interval?: number; // 上报设备的间隔，单位为ms，默认为0ms，意思是找到新设备立即上报，否则根据传入的间隔上报
        }
      | Array<string>
      | string,
    callback?: Function
  );

  // 停止搜寻附近的蓝牙外围设备。
  function stopBluetoothDevicesDiscovery(): void;

  // 蓝牙设备
  type BluetoothDeviceType = {
    name?: string; // 蓝牙设备名称，某些设备可能没有
    deviceName: string; // 值与 name 一致(兼容旧版本)
    localName: string; // 广播设备名称
    deviceId: string; // 设备 Id
    RSSI: number; // 设备信号强度
    advertisData: string; // 设备的广播内容: Hex String
  };

  // 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。可直接传入一个数组作为 OPTION.services 参数。也可直接传入一个字符串作为 OPTION.services 的第一项。
  function getBluetoothDevices(params: {
    success: (params: { devices: BluetoothDeviceType[] }) => void;
    fail: commonFail;
  });

  // 根据 service 的 uuid 获取处于已连接状态的设备。可直接传入一个数组作为 OPTION.services 参数。也可直接传入一个字符串作为 OPTION.services 的第一项。
  function getConnectedBluetoothDevices(params: {
    success: (params: { devices: BluetoothDeviceType[] }) => void;
    fail: commonFail;
  });

  // 连接低功耗蓝牙设备。可直接传入一个字符串作为 OPTION.deviceId。
  function connectBLEDevice({
    deviceId: string, // 蓝牙设备 id
    success: commonSuccess,
    fail: commonFail,
  });

  // 断开与低功耗蓝牙设备的连接。可直接传入一个字符串作为 OPTION.deviceId。
  function disconnectBLEDevice({
    deviceId: string, // 蓝牙设备 id
    success: commonSuccess,
    fail: commonFail,
  });

  // 向低功耗蓝牙设备特征值中写入数据。
  function writeBLECharacteristicValue(params: {
    deviceId: string; // 蓝牙设备 id，参考 device 对象
    serviceId: string; // 蓝牙特征值对应 service 的 uuid
    characteristicId: string; // 蓝牙特征值的 uuid
    descriptorId?: string; // notify 的 descriptor 的 uuid
    value: string; // 蓝牙设备特征值对应的值，16进制字符串,限制在20字节内。写入的二进制数据需要进行 hex 编码。
    success?: commonSuccess;
    fail?: commonFail;
  });

  // 读取低功耗蓝牙设备特征值中的数据。调用后在 ap.onBLECharacteristicValueChange() 事件中接收数据返回。
  function readBLECharacteristicValue(params: {
    deviceId: string; // 蓝牙设备 id，参考 device 对象
    serviceId: string; // 蓝牙特征值对应 service 的 uuid
    characteristicId: string; // 蓝牙特征值的 uuid,
    success: commonSuccess;
    fail: commonFail;
  });

  // 启用低功耗蓝牙设备特征值变化时的 notify 功能。注意：必须设备的特征值支持notify才可以成功调用，具体参照 characteristic 的 properties 属性 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件。
  function notifyBLECharacteristicValueChange(params: {
    deviceId: string; // 蓝牙设备 id，参考 device 对象
    serviceId: string; // 蓝牙特征值对应 service 的 uuid
    characteristicId: string; // 蓝牙特征值的 uuid,
    success: commonSuccess;
    fail: commonFail;
  });

  // 获取蓝牙设备所有 service（服务）。
  type BleService = {
    serviceId: string; // 蓝牙设备服务的 uuid
    isPrimary: boolean; // 该服务是否为主服务
  };
  function getBLEDeviceServices(params: {
    deviceId: string; // 蓝牙设备 id，参考 device 对象
    success: (res: { services: BleService[] }) => void;
    fail: commonFail;
  });

  // 获取蓝牙设备所有 characteristic（特征值）。
  type characteristicsProp = {
    read: boolean; // 该特征值是否支持 read 操作
    write: boolean; // 该特征值是否支持 write 操作
    notify: boolean; // 该特征值是否支持 notify 操作
    indicate: boolean; // 该特征值是否支持 indicate 操作
  };
  type characteristics = {
    characteristicId: string; // 蓝牙设备特征值的 uuid
    serviceId: string; // 蓝牙设备特征值对应服务的 uuid
    value: string; // 蓝牙设备特征值对应的16进制值
    properties: characteristicsProp; // 该特征值支持的操作类型
  };
  function getBLEDeviceCharacteristics(params: {
    deviceId: string; // 蓝牙设备 id，参考 device 对象
    serviceId: string; // 蓝牙特征值对应 service 的 uuid,
    success: (res: characteristics[]) => void;
    fail: commonFail;
  });

  // 搜索到新的蓝牙设备时触发此事件。
  function onBluetoothDeviceFound(
    callback: (res: BluetoothDeviceType[]) => void
  );

  // 移除寻找到新的蓝牙设备事件的监听。
  // 为防止多次注册事件监听导致一次事件多次回调，建议每次调用on方法监听事件之前，先调用off方法，关闭之前的事件监听。
  function offBluetoothDeviceFound(callback: Function);

  // 监听低功耗蓝牙设备的特征值变化的事件。
  function onBLECharacteristicValueChange(params: {
    deviceId: string; // 蓝牙设备 id，参考 device 对象
    serviceId: string; // 特征值所属 service 的 uuid
    characteristicId: string; // 特征值 uuid
    value: string; // 特征值最新的16进制值
    success: commonSuccess;
    fail: commonFail;
  });

  // 移除低功耗蓝牙设备的特征值变化事件的监听。
  function offBLECharacteristicValueChange(callback: Function);

  // 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
  function onBLEConnectionStateChanged(
    callback: (res: {
      deviceId: string; // 蓝牙设备 id，参考 device 对象
      connected: boolean; // 连接目前的状态
    }) => void
  );

  // 移除低功耗蓝牙连接的错误事件的监听。
  function offBLEConnectionStateChanged(callback: Function);

  // 监听本机蓝牙状态变化的事件。
  function onBluetoothAdapterStateChange(
    callback: (res: {
      available: boolean; // 蓝牙模块是否可用
      discovering: boolean; // 蓝牙模块是否处于搜索状态
    }) => void
  );

  // 移除本机蓝牙状态变化的事件的监听。
  function offBluetoothAdapterStateChange(callback: Function);

  /**
   * 罗盘
   */

  // 监听罗盘数据变化的事件。
  function onCompassChange(
    callback: (res: {
      direction: number; // 罗盘数据
    }) => void
  );

  // 移除罗盘数据变化事件的监听。
  function offCompassChange(callback: Function);

  /**
   * 重力感应
   */

  // 监听重力感应变化
  function onAccelerometerChange(
    callback: (res: {
      x: number; // x轴
      y: number; // y轴
      z: number; // z轴
    }) => void
  );

  // 移除重力感应变化事件的监听
  function offAccelerometerChange(callback: Function);

  /**
   * 窗口行为
   */

  // pushWindow 用来打开一个新的页面，自带转场动画。可直接传入一个字符串作为 OPTION.url 参数。
  function pushWindow(
    params:
      | {
          url: string; // 要打开的页面url要打开的页面url
          data?: Object; // url的参数，会以 query string 跟在 url 后面。在打开的新页面里可以用 ap.parseQueryString() 来获取
        }
      | string
  );

  // 关闭当前页面。可直接传入一个对象作为 OPTION.data 参数。 https://myjsapi.alipay.com/alipayjsapi/navigation/window/popWindow.html
  function popWindow(data?: Object): void;

  // popTo 可以一次回退多级页面。可直接传入一个字符串作为 OPTION.urlPattern 参数，或直接传入一个整数作为 OPTION.index 参数。
  function popTo(
    params:
      | {
          url?: string; // 目标页面的完整 URL
          urlPattern?: string; // 目标页面的 URL 匹配表达式（ URL 如果包含 urlPattern，匹配成功）
          index?: number; // 	目标页面在会话页面栈中的索引；如果小于零，则将与当前页面的 index 相加
          data?: Object; // 传递的 data 对象将会被即将露出的页面通过 onResume 事件接收
        }
      | string
      | number,
    callback?: commonSuccess
  );

  // 替换当前页面，并且不会产生历史记录。可直接传入一个字符串作为 OPTION.url 参数。
  function redirectTo(
    params:
      | {
          url: string; // 要打开的页面url
          data?: Object; // 	url的参数，会以 query string 跟在 url 后面。在打开的新页面里可以用 ap.parseQueryString() 来获取
        }
      | string
  );

  /**
   * 窗口事件
   */

  // onResume
  /**当一个页面重新可见时，会触发此事件，包括下列两种情况：

    从后台被唤起和锁屏界面恢复，触发 appResume 的同时会触发此事件。
    通过 popWindow/popTo 从下个页面回退，触发 pageResume 的同时会触发此事件。

    此外，如果这个页面是通过 popWindow/popTo 到达，且传递了 data 参数，此页可以获取到 data。
    */
  function onResume(callback: (data: Object) => void);

  /**
   * 
   * 当一个页面不可见时，会触发此事件。包括下面两种情况：

    被压入后台和锁屏，触发 appPause 的同时会触发此事件。
    通过 pushWindow 打开下个页面，当前页面触发 pagePause 的同时会触发此事件。
   */
  function onPause(callback: commonSuccess);

  // 移除 pause 事件的监听。
  function offPause(callback: Function);

  // 移除 resume 事件的监听。
  function offResume(callback: Function);

  /**
   * 当一个页面重新可见时(仅指从下个页面回退)，会触发此事件。
    如果这个页面通过 popWindow/popTo 到达时传递了 data 参数，此页可以获取到 data
   */
  function onPageResume(callback: (data: Object) => void);

  // 移除 pageResume 事件的监听。
  function offPageResume(callback: Function);

  // 当一个页面不可见时(仅指 pushWindow 到下个页面)，会触发此事件。
  function onPagePause(callback: () => void);

  // 移除 pagePause 事件的监听。
  function offPagePause(callback: Function);

  /**
   * 应用事件
   */

  // 监听应用压后台事件。
  function onAppPause(callback: commonCallback);

  // 移除应用压后台事件的监听。
  function offAppPause(callback: Function);

  // 监听应用从后台唤起事件。
  function onAppResume(callback: commonCallback);

  // 移除应用从后台唤起事件的监听。
  function offAppResume(callback: Function);

  /**
   * 界面
   */

  // 显示 alert 警告框。可直接传入一个字符串作为 OPTION.content 参数。 https://myjsapi.alipay.com/alipayjsapi/ui/notice/alert.html
  function alert(
    params: {
      title?: string;
      content: string;
      buttonText?: string;
    },
    callback?: commonCallback
  ): void;

  // 显示 confirm 确认框。可直接传入一个字符串作为 OPTION.content 参数。
  function confirm(
    option:
      | {
          title?: string;
          content?: string;
          confirmButtonText?: string;
          cancelButtonText?: string;
        }
      | string,
    callback?: (confirm: boolean) => void
  );

  // 显示弱提示。可选择多少秒之后消失。可直接传入一个字符串作为 OPTION.content 参数。
  type toastType = "success" | "fail" | "exception" | "none";
  function showToast(
    option:
      | {
          content: string;
          type?: toastType;
          duration?: number; // 显示时长，单位为 ms，默认 2000
        }
      | string,
    callback: commonCallback
  );

  // 隐藏弱提示。
  function hideToast();

  // 显示加载提示。可直接传入一个字符串作为 OPTION.content 参数。
  function showLoading(
    option:
      | {
          content?: string; // loading 的文字提示
          delay?: number; // 延迟显示，单位 ms，默认 0。如果在此时间之前调用了 ap.hideLoading 则不会显示
        }
      | string
  );

  // 隐藏加载提示。
  function hideLoading();

  // 显示操作菜单。
  function showActionSheet(
    option: {
      title?: string; // 菜单标题
      items: string[]; // 菜单按钮的文字数组
      cancelButtonText?: string; // 取消按钮文案，默认为「取消」
    },
    callback: (
      index: number // 被点击的按钮的索引，从0开始。点击取消或蒙层时返回 -1
    ) => void
  );

  /**
   * 导航栏
   */

  // 监听导航栏标题点击事件。
  function onTitleClick(callback: commonCallback);

  // 设置导航栏标题及样式。可直接传入一个字符串作为 OPTION.title 参数。
  function setNavigationBar(
    option:
      | {
          title?: string; // 导航栏标题
          image?: string; // 图片链接地址，必须 https，请使用一张3x高清图，尺寸450*90。若设置了 image，则 title 参数失效
          backgroundColor?: string; // 导航栏背景色，支持16进制颜色值
          borderBottomColor?: string; // 导航栏底部边框颜色，支持16进制颜色值。若设置了 backgroundColor，borderBottomColor 会不生效，默认会和 backgroundColor 颜色一样。
          reset?: boolean; // 是否重置导航栏为支付宝默认配色，默认 false。
        }
      | string,
    callback?: commonCallback
  );

  // 移除导航栏标题点击事件的监听。
  function offTitleClick(callback?: commonCallback): void;

  // 显示导航栏加载图标。
  function showNavigationBarLoading();

  // 隐藏导航栏加载图标。
  function hideNavigationBarLoading();

  // 设置导航栏右侧按钮。
  type optionButtonType =
    | "user"
    | "filter"
    | "search"
    | "add"
    | "settings"
    | "scan"
    | "info"
    | "help"
    | "locate"
    | "more";
  type optionButtonItem = {
    title?: string; // 按钮标题，与 type、icon 三选一。
    color?: string; // 按钮标题文字颜色，与 title、type 三选一。
    icon?: string; // 按钮图标，支持 base64
    type?: optionButtonType; // 按钮图标类型，与 title、icon 三选一。支持 user / filter / search / add / settings / scan / info / help / locate / more
  };
  function setOptionButton(
    option:
      | {
          reset?: boolean; // 重置到系统默认按钮，默认为 false。当为 true 时，忽略其他参数
          preventDefault?: boolean; // 是否阻止默认的分享功能，指定 iconType 的情况下点击时，会弹分享面板，preventDefault: true 会阻止默认分享面板弹出
          items?: optionButtonItem[]; // 按钮数组，数组中每个项是一个对象。item 的具体配置字段见下表
          onClick?: (index: number) => void;
        }
      | optionButtonItem[]
  );

  // 显示导航栏右侧按钮。
  function showOptionButton();

  // 隐藏导航栏右侧按钮。
  function hideOptionButton();

  // 显示导航栏右上角弹出的下拉菜单。可直接传入一个数组作为 OPTION.items 参数。
  type popMenuItem = {
    title: string; // 菜单标题，可直接作为 items 数组元素。
    icon: string; // 菜单图标，支持 base64
    badge?: string; // 菜单红色气泡，默认 -1。其中 0 表示小红点，-1 表示不显示，其他值展示出来
  };

  function showPopMenu(option: {
    items: popMenuItem[];
    onClick?: (index: number) => void;
  });

  /**
   * 下拉刷新
   */

  // 下拉刷新开关。可直接传入一个布尔值作为 OPTION.allow 参数。
  function allowPullDownRefresh(allow: boolean);

  // 监听页面下拉事件。
  function onPullDownRefresh(
    callback: (res: {
      refreshAvailable: boolean; // 是否可刷新。可通过ap.allowPullDownRefresh()设置此返回值
    }) => void
  );

  // 移除页面下拉刷新事件的监听。
  function offPullDownRefresh(callback: commonCallback);

  /**
   * 分享
   */

  // 选择系统通信录中某个联系人的电话。
  function choosePhoneContact(
    callback: (res: {
      name: string; // 选中的联系人姓名
      mobile: string; // 选中的联系人手机号
    }) => void
  );

  // 打开支付宝通讯录，选择一个或者多个支付宝联系人。
  function chooseAlipayContact(
    count: number,
    callback: (res: {
      realName: string; // 账号的真实姓名
      mobile: string; // 账号对应的手机号码
      email: string; // 账号的邮箱
      avatar: string; // 账号的头像链接
      userId: string; // 支付宝账号 userId
    }) => void
  );

  /**
   * 选择城市
   */

  // 打开城市选择列表。
  type city = {
    city: string; // 城市名
    adCode: string; // 行政区划代码
    spell?: string; // 城市名对应拼音拼写，方便用户搜索
  };
  function chooseCity(
    option: {
      showLocatedCity?: boolean; // 是否显示当前定位城市，默认 false
      showHotCities?: boolean; // 是否显示热门城市，默认 true
      cities?: city[]; // 自定义城市列表，列表内对象字段见下表
      hotCities?: city[]; // 自定义热门城市列表，列表内对象字段见下表
    },
    callback: (res: { city: string; code: string }) => void
  );

  /**
   * 选择日期
   */

  // 选择日期。可直接传入一个字符串作为 OPTION.formate 参数。
  type dateFormat = "HH:mm:ss" | "yyyy-MM-dd" | "yyyy-MM-dd HH:mm:ss";
  function datePicker(
    option: {
      formate?: dateFormat; // 返回的日期格式，默认 yyyy-MM-dd。支持 HH:mm:ss, yyyy-MM-dd, yyyy-MM-dd HH:mm:ss 三种格式
      currentDate?: string; // 初始选择的日期时间，默认当前时间
      startDate?: string; // 最小日期时间
      endDate?: string; // 最大日期时间
    },
    callback: (res: { date: string }) => void
  );

  /**
   * 开放接口
   */

  // 发起支付，可直接传入一个字符串作为 OPTION.orderStr 参数。
  // 回调函数的resultCode详细说明见: https://myjsapi.alipay.com/alipayjsapi/util/pay/tradePay.html
  function tradePay(
    option:
      | {
          tradeNO?: string; // 交易号，多个交易号请用英文分号;分隔
          partnerID?: string; // 商户id
          bizType?: string; // 交易类型，默认为 ‘trade’
          bizSubType?: string; // 交易子类型
          bizContext?: string; // 支付额外的参数，格式为JSON字符串
          orderStr?: string; // 完整的支付参数拼接成的字符串，从服务端获取。需要入驻蚂蚁金服开放平台
        }
      | string,
    callback: (res: { resultCode: string }) => void
  );

  // 获取当前服务器时间的毫秒数
  function getServerTime(
    callback: (res: {
      time: number; // 当前服务器时间的毫秒数
    }) => {}
  );
}
declare function ap(): void;
/*=============================支付宝内全局变量==============================*/
declare global {
  interface Window {
    AlipayJSBridge: any;
    __apjs_environment: any;
  }
  const AlipayJSBridge: any;
}
export default ap;
