import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const assembly = JSON.parse(
  readFileSync(new URL('../.sdkwork-assembly.json', import.meta.url), 'utf8'),
);

const expectedTierBReservePackages = {
  java: {
    name: 'com.sdkwork:im-sdk',
    manifestPath: 'sdkwork-im-sdk-java/composed/pom.xml',
    description: 'Manual-owned Java semantic SDK boundary for IM',
  },
  csharp: {
    name: 'Sdkwork.Im.Sdk',
    manifestPath: 'sdkwork-im-sdk-csharp/composed/ImSdk.csproj',
    description: 'Manual-owned C# semantic SDK boundary for IM',
  },
  swift: {
    name: 'ImSdk',
    manifestPath: 'sdkwork-im-sdk-swift/composed/Package.swift',
    description: 'Manual-owned Swift semantic SDK boundary for IM',
  },
  kotlin: {
    name: 'com.sdkwork:im-sdk',
    manifestPath: 'sdkwork-im-sdk-kotlin/composed/build.gradle.kts',
    description: 'Manual-owned Kotlin semantic SDK boundary for IM',
  },
  go: {
    name: 'github.com/sdkwork/im-sdk',
    manifestPath: 'sdkwork-im-sdk-go/composed/go.mod',
    description: 'Manual-owned Go semantic SDK boundary for IM',
  },
  python: {
    name: 'sdkwork-im-sdk',
    manifestPath: 'sdkwork-im-sdk-python/composed/pyproject.toml',
    description: 'Manual-owned Python semantic SDK boundary for IM',
  },
};

for (const [language, expectedReserve] of Object.entries(expectedTierBReservePackages)) {
  const entry = assembly.languages.find((candidate) => candidate.language === language);
  assert.ok(entry, `missing ${language} assembly entry`);
  assert.equal(entry.maturityTier, 'tier-b', `${language} must remain Tier B`);
  assert.equal(entry.consumerPackage, null, `${language} must not declare a consumer package yet`);

  const generatedPackage = entry.packages.find((candidate) => candidate.layer === 'generated');
  const composedPackage = entry.packages.find((candidate) => candidate.layer === 'composed');

  assert.ok(generatedPackage, `${language} must keep a generated package layer`);
  assert.ok(composedPackage, `${language} must keep a composed package layer`);
  assert.equal(entry.manifestPath, generatedPackage.manifestPath, `${language} entry manifest must stay generated`);
  assert.equal(entry.generatedPath, generatedPackage.packagePath, `${language} generatedPath must align with generated package layer`);
  assert.equal(composedPackage.name, expectedReserve.name, `${language} composed package identity mismatch`);
  assert.equal(composedPackage.manifestPath, expectedReserve.manifestPath, `${language} composed manifest mismatch`);
  assert.equal(composedPackage.version, '', `${language} reserved composed version must stay empty`);
  assert.equal(composedPackage.status, 'reserved', `${language} composed package must stay reserved`);
  assert.equal(
    composedPackage.description,
    expectedReserve.description,
    `${language} reserved composed description mismatch`,
  );
}

console.log('tier-b reserved assembly contract test passed');
