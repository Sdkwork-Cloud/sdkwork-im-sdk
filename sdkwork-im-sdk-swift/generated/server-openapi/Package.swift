// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "ImSdkGenerated",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15),
    ],
    products: [
        .library(
            name: "ImSdkGenerated",
            targets: ["ImSdkGenerated"]
        ),
    ],
    dependencies: [
        .package(url: "https://github.com/sdkwork/sdk-common-swift.git", from: "1.0.0")
    ],
    targets: [
        .target(
            name: "ImSdkGenerated",
            dependencies: ["SDKworkCommon"],
            path: "Sources"
        )
    ]
)

