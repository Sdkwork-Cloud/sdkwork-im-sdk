function freezeRecordOfArrays(record) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(record).map(([key, value]) => [key, Object.freeze([...value])]),
    ),
  );
}

function toPascalCase(value) {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createLiteralPattern(value, flags = '') {
  return new RegExp(escapeRegExp(value), flags);
}

const legacyWord = ['back', 'end'].join('');
const pascalLegacyWord = toPascalCase(legacyWord);
const hyphenSdkSuffix = `${legacyWord}-sdk`;
const underscoreSdkSuffix = `${legacyWord}_sdk`;
const legacyProductHyphenPrefix = ['craw', 'chat'].join('-');
const legacyProductPackageSuffix = `${legacyProductHyphenPrefix}-${hyphenSdkSuffix}`;

export const legacyAliasTerms = Object.freeze({
  typescriptPackage: `@sdkwork/${legacyProductPackageSuffix}`,
  hyphenPackage: `sdkwork-${legacyProductPackageSuffix}`,
  javaPackage: `com.sdkwork:${legacyProductPackageSuffix}`,
  dotNetPackage: `Sdkwork.Im.${pascalLegacyWord}Sdk`,
  goPackage: `github.com/sdkwork/${legacyProductPackageSuffix}`,
  swiftPackage: `Im${pascalLegacyWord}Sdk`,
  clientClass: `Sdkwork${pascalLegacyWord}Client`,
  generatedFactory: `createGenerated${pascalLegacyWord}Client`,
  genericClientClass: `${pascalLegacyWord}Client`,
  flutterPackageName: underscoreSdkSuffix,
  flutterPackageImport: `package:${underscoreSdkSuffix}/${underscoreSdkSuffix}.dart`,
  flutterClientFile: `${legacyWord}_client.dart`,
  flutterSdkFile: `${underscoreSdkSuffix}.dart`,
  clientLikeStem: `${legacyWord}-client-like`,
  generatedTypesStem: `generated-${legacyWord}-types`,
});

export const legacyGeneratedClientTerms = Object.freeze({
  clientClass: ['Im', 'Generated', 'Client'].join(''),
  clientLike: ['Im', 'Generated', 'Client', 'Like'].join(''),
  factory: ['create', 'Generated', 'Client'].join(''),
  instanceToken: ['generated', 'Client'].join(''),
});

export const legacyReadmeForbiddenTerms = freezeRecordOfArrays({
  typescript: [
    legacyAliasTerms.typescriptPackage,
    legacyAliasTerms.clientClass,
    legacyAliasTerms.generatedFactory,
    legacyGeneratedClientTerms.clientClass,
    legacyGeneratedClientTerms.factory,
  ],
  flutter: [
    legacyAliasTerms.flutterPackageName,
    legacyAliasTerms.flutterPackageImport,
    legacyAliasTerms.genericClientClass,
  ],
  rust: [legacyAliasTerms.hyphenPackage],
  java: [legacyAliasTerms.javaPackage, legacyAliasTerms.clientClass],
  csharp: [legacyAliasTerms.dotNetPackage, legacyAliasTerms.clientClass],
  swift: [legacyAliasTerms.swiftPackage],
  kotlin: [legacyAliasTerms.javaPackage],
  go: [legacyAliasTerms.goPackage],
  python: [legacyAliasTerms.hyphenPackage],
});

export const legacyAliasPathPatterns = Object.freeze([
  new RegExp(`${escapeRegExp(legacyAliasTerms.flutterClientFile)}$`, 'i'),
  new RegExp(`${escapeRegExp(legacyAliasTerms.flutterSdkFile)}$`, 'i'),
  new RegExp(`${escapeRegExp(legacyAliasTerms.clientLikeStem)}\\.(ts|js|d\\.ts)$`, 'i'),
  new RegExp(`${escapeRegExp(legacyAliasTerms.generatedTypesStem)}\\.(ts|js|d\\.ts)$`, 'i'),
]);

export const legacyAliasContentPatterns = Object.freeze([
  createLiteralPattern(legacyAliasTerms.typescriptPackage),
  createLiteralPattern(legacyAliasTerms.hyphenPackage),
  createLiteralPattern(legacyAliasTerms.javaPackage),
  createLiteralPattern(legacyAliasTerms.dotNetPackage),
  createLiteralPattern(legacyAliasTerms.goPackage),
  createLiteralPattern(legacyAliasTerms.swiftPackage),
  createLiteralPattern(legacyAliasTerms.clientClass),
  createLiteralPattern(legacyAliasTerms.generatedFactory),
  createLiteralPattern(legacyGeneratedClientTerms.clientClass),
  createLiteralPattern(legacyGeneratedClientTerms.factory),
  createLiteralPattern(legacyAliasTerms.flutterPackageImport),
  new RegExp(`\\b${escapeRegExp(legacyAliasTerms.flutterPackageName)}\\b`),
]);
