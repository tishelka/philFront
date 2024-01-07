from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, address, phone_number, password=None):

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            address=address,
            phone_number=phone_number,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, last_name, address, phone_number, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            first_name=first_name,
            last_name=last_name,
            address=address,
            phone_number=phone_number,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(
        max_length=255,
        unique=True,
    )

    id = models.BigAutoField(primary_key=True)

    last_name = models.TextField(blank=True,default='')
    first_name = models.TextField(blank=True, default='')
    phone_number = models.TextField(blank=True, default='')
    address = models.TextField(blank=True, default='')

    is_active = models.BooleanField(default=True)

    is_admin = models.BooleanField(default=False)
    linkedin_token = models.TextField(blank=True, default='')

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()
    REQUIRED_FIELDS = ['last_name', 'first_name', 'phone_number', 'address']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin


class Category(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Producer(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=500, default='No description provided')
    price = models.IntegerField(default=0)

class Order(models.Model):
    user = models.ForeignKey(CustomUser, related_name='my_orders', on_delete=models.CASCADE)
    product = models.ForeignKey('system.Product', related_name='ordered_by', on_delete=models.CASCADE)


