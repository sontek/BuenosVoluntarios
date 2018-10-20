#!/bin/bash

cd App/node_modules/react-native/scripts
echo $PWD
./ios-install-third-party.sh
cd ../../../../
echo $PWD
cd App/node_modules/react-native/third-party/glog-0.3.5/
echo $PWD
../../scripts/ios-configure-glog.sh
cd ../../../../../
echo $PWD
