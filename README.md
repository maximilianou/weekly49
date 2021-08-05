# Kubernetes, CI tekton, CD flux
weekly49

[![GitOps Continuous Delivery on Kubernetes with Flux lfs269 Certificate, Linux Fundation](https://raw.githubusercontent.com/maximilianou/weekly49/main/share/maximiliano-usich-gitops-continuous-delivery-on-kubernetes-with-flux-lfs269-certificate.png)](https://raw.githubusercontent.com/maximilianou/weekly49/main/share/maximiliano-usich-gitops-continuous-delivery-on-kubernetes-with-flux-lfs269-certificate.png)

<https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/3499b883-e4e1-41cf-8487-1553fdd33103-maximiliano-usich-gitops-continuous-delivery-on-kubernetes-with-flux-lfs269-certificate.pdf>

<https://github.com/fluxcd/flux2-multi-tenancy>

- Repositories
  - Flux Fleet
  - Project Deployment (tenant)
  - Project/App Source.

```
curl -fsSL https://raw.githubusercontent.com/lfs269/setup/main/setup_project_repo.sh | bash -
```

```
sed -i 's/flux-system/instavote/g' *
```    

```
---
apiVersion: v1
kind: Namespace
metadata:
  name: app1-ns
---
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: app1-ns
spec:
  selector:
    matchLabels:
      app: hello
      tier: backend
      track: stable
  replicas: 3
  template:
    metadata:
      labels:
        app: hello
        tier: backend
        track: stable
    spec:
      containers:
        - name: hello
          image: "gcr.io/google-samples/hello-go-gke:1.0"
          ports:
            - name: http
              containerPort: 80
---
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  namespace: app1-ns
spec:
  selector:
    app: hello
    tier: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: http
---
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  namespace: app1-ns
spec:
  selector:
    app: hello
    tier: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: http
---
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: app1-ns
spec:
  selector:
    app: hello
    tier: frontend
  ports:
    - protocol: "TCP"
      port: 80
      targetPort: 80
  type: LoadBalancer
---
```

```
upstream Backend {
  server hello;
}
server {
  listen 80;
  location / {
    proxy_pass http://Backend;
  }
}

```

```
step49_2010 app1_lb_create:
	cd kubernetes/step01_frontbacksvc && kubectl apply -f .

step49_2020 app1_ns_view:
	watch kubectl get all -n=app1-ns

step49_2999 app1_ns_delete:
	kubectl delete namespace app1-ns
```

----
- Expose nginx 8080
```
$ k3d cluster create dev-cluster

$ kubectl create namespace app1-ns
namespace/app1-ns created
$ kubectl create deployment nginx --image=nginx --namespace=app1-ns
deployment.apps/nginx created
$ kubectl create service clusterip nginx --tcp=8080:80 --namespace=app1-ns
service/nginx created
$ cat <<EOF | kubectl apply -f -
> apiVersion: networking.k8s.io/v1
> kind: Ingress
> metadata:
>   name: nginx
>   namespace: app1-ns
>   annotations:
>     ingress.kubernetes.io/ssl-redirect: "false"
> spec:
>   defaultBackend:
>     service:
>       name: nginx
>       port:
>         number: 8080
> EOF
ingress.networking.k8s.io/nginx created
```
----

```
$ kubectl create namespace app1-ns --dry-run=client -o yaml > app1-namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app1-ns


$ kubectl create deployment nginx --image=nginx --namespace=app1-ns --dry-run=client -o yaml > nginx-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx
  name: nginx
  namespace: app1-ns
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx
        name: nginx


$ kubectl create service clusterip nginx --tcp=8080:80 --namespace=app1-ns --dry-run=client -o yaml > nginx-service.yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  ports:
  - name: 8080-80
    port: 8080
    protocol: TCP
    targetPort: 80
  selector:
    app: nginx
  type: ClusterIP
status:
  loadBalancer: {}

- nginx-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
  namespace: app1-ns
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  defaultBackend:
    service:
      name: nginx
      port:
        number: 8080

```

