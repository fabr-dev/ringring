# RingRing

## OpenCV

### Issues

````⠦ Building module: opencv4nodejs, Completed: 0C:\Users\fabib\Projects\ringring\release\app\node_modules\opencv4nodejs\cc\macros.h(2,10): fatal error C1083: Cannot open include file: 'opencv2/core.hpp': No such file or directory [C:\Users\
fabib\Projects\ringring\release\app\node_modules\opencv4nodejs\build\opencv4nodejs.vcxproj]
✖ Rebuild Failed

An unhandled error occurred inside electron-rebuild
node-gyp failed to rebuild 'C:\Users\fabib\Projects\ringring\release\app\node_modules\opencv4nodejs'.
For more information, rerun with the DEBUG environment variable set to "electron-rebuild".

Error: `C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe` failed with exit code: 1



Error: node-gyp failed to rebuild 'C:\Users\fabib\Projects\ringring\release\app\node_modules\opencv4nodejs'.
For more information, rerun with the DEBUG environment variable set to "electron-rebuild".

Error: `C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe` failed with exit code: 1


    at NodeGyp.rebuildModule (C:\Users\fabib\Projects\ringring\node_modules\electron-rebuild\lib\src\module-type\node-gyp.js:117:19)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async ModuleRebuilder.rebuildNodeGypModule (C:\Users\fabib\Projects\ringring\node_modules\electron-rebuild\lib\src\module-rebuilder.js:94:9)
    at async ModuleRebuilder.rebuild (C:\Users\fabib\Projects\ringring\node_modules\electron-rebuild\lib\src\module-rebuilder.js:124:14)
    at async Rebuilder.rebuildModuleAt (C:\Users\fabib\Projects\ringring\node_modules\electron-rebuild\lib\src\rebuild.js:145:13)
    at async Rebuilder.rebuild (C:\Users\fabib\Projects\ringring\node_modules\electron-rebuild\lib\src\rebuild.js:108:17)
    at async C:\Users\fabib\Projects\ringring\node_modules\electron-rebuild\lib\src\cli.js:154:9
    ```

**Solution:**
1. Install opencv manually (https://github.com/justadudewhohacks/opencv4nodejs#windows)
2. Set environment variable `OPENCV4NODEJS_DISABLE_AUTOBUILD` to `1`
3. Run `yarn add opencv4nodejs`
4. Modify opencv4nodejs binding.gyp
  - Go to `./release/app/node_modules/opencv4nodejs/binding.gyp`
  - Modify `binding.gyp` file
````

...
"include_dirs" : [
"C:/tools/opencv/build/include",
"<!@(node ./install/parseEnv.js OPENCV4NODEJS_INCLUDES)",
"cc",
"cc/core",
"<!(node -e \"require('nan')\")",
"<!(node -e \"require('native-node-utils')\")"
],
"link_settings": {
"libraries": [
"-lopencv_world460.lib"
],
"library_dirs": [
"C:/tools/opencv/build/x64/vc15/lib"
]
},
"libraries": [
"<!@(node ./install/parseEnv.js OPENCV4NODEJS_LIBRARIES)",
],
...

```
5. Run `yarn run electron-opencv-rebuild`
```
