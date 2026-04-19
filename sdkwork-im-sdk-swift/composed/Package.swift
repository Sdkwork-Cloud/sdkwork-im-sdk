// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "ImSdk",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15),
    ],
    products: [
        .library(
            name: "ImSdk",
            targets: ["ImSdk"]
        ),
    ],
    targets: [
        .target(
            name: "ImSdk",
            path: "Sources"
        )
    ]
)
