## 

## desde 0
crear el cluster
crear el servicio
crear el registry
crear el repository <- la imagen
crear el task definition <- como se va a correr el contenedor
hacer update service para hacer deploy de tu servicio

flujo para crear el cluster
```
if cluster not found then
  crear cluster
  crear servicio
  crear task definition
end

actualiza el servicio
```
aws ecs list-clusters --region eu-central-1

aws ecs create-cluster --cluster-name steam-cluster --region eu-central-1
aws ecs create-cluster --cluster-name steam-cluster --capacity-providers FARGATE --region eu-central-1

aws ecs register-task-definition \
  --cli-input-json file://steam-backend-task.json

aws ecs update-service \
  --cluster steam-cluster \
  --service steam-backend-service \
  --task-definition steam-backend-task \
  --region eu-central-1

aws logs tail /ecs/steam-backend --region eu-central-1 --since 5m --follow