from setuptools import setup, find_packages

setup(
    name="sdkwork-backend-sdk",
    version="1.0.11",
    description="sdkwork-im-sdk SDK",
    author="SDKWork Team",
    author_email="support@sdkwork.com",
    url="https://github.com/sdkwork/sdkwork-backend-sdk",
    packages=find_packages(),
    install_requires=[
        "sdkwork-common>=1.0.0",
    ],
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
    ],
)
