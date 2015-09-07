#VOLUME /data
#

weedCmd=`mongo  --eval "printjson(db.serverStatus())" ds041593.mongolab.com:41593/configdb -u ro -p ro`

echo $weedCmd

#
#docker run --name weedserver -d \
#  -v `pwd`/data:/data \
#  -p 3000:3000 -p 8000:8080 -p 9333:9333 \
#  -e APP='asset.2bees.com' \
#  -t 2beesadmin/weedfs

#docker exec -it weedserver bash
