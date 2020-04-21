echo '开始发布到测试环境 >>>' $1

# 推送镜像
docker push $1