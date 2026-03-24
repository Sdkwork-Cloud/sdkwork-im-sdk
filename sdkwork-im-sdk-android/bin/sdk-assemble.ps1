param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $RemainingArgs
)

$ErrorActionPreference = "Stop"
$workspaceDir = (Resolve-Path (Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) "..\..")).Path
& (Join-Path $workspaceDir "sdkwork-im-sdk-kotlin\bin\sdk-assemble.ps1") @RemainingArgs
exit $LASTEXITCODE
