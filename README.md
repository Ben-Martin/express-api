


# EC2 configuration
#!/bin/bash
yum update -y
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs
mkdir /var/www/