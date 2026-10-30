-- CreateTable
CREATE TABLE "SourceGeneration" (
    "id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "sourceMode" TEXT NOT NULL,
    "endpointLabel" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'CANDIDATE',
    "validation" JSONB,
    "validatedAt" TIMESTAMP(3),
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceGenerationCursor" (
    "id" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "reportKey" TEXT NOT NULL,
    "lastSourceUpdatedAt" TIMESTAMP(3),
    "reconciledAt" TIMESTAMP(3),
    "rowCount" INTEGER,
    "digest" TEXT,

    CONSTRAINT "SourceGenerationCursor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemanticSnapshotManifest" (
    "id" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "partitionKey" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "contentSha256" TEXT NOT NULL,
    "sourceWatermark" TIMESTAMP(3),
    "state" TEXT NOT NULL DEFAULT 'STAGED',
    "bytes" INTEGER NOT NULL,
    "validatedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SemanticSnapshotManifest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemanticPublicationPointer" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "partitionKey" TEXT NOT NULL,
    "manifestId" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SemanticPublicationPointer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemanticPublicationAudit" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "partitionKey" TEXT NOT NULL,
    "previousManifestId" TEXT,
    "nextManifestId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SemanticPublicationAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemanticRefreshJob" (
    "id" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "partitionKey" TEXT NOT NULL DEFAULT 'all',
    "sourceWatermark" TIMESTAMP(3) NOT NULL,
    "changedFeeds" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leasedUntil" TIMESTAMP(3),
    "workerId" TEXT,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SemanticRefreshJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceConnectionVault" (
    "generationId" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "ciphertext" TEXT NOT NULL,
    "authTag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceConnectionVault_pkey" PRIMARY KEY ("generationId")
);

-- CreateTable
CREATE TABLE "SourceActivationAudit" (
    "id" TEXT NOT NULL,
    "previousGenerationId" TEXT,
    "nextGenerationId" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SourceActivationAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SourceGeneration_fingerprint_key" ON "SourceGeneration"("fingerprint");

-- CreateIndex
CREATE INDEX "SourceGeneration_state_updatedAt_idx" ON "SourceGeneration"("state", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "SourceGenerationCursor_generationId_reportKey_key" ON "SourceGenerationCursor"("generationId", "reportKey");

-- CreateIndex
CREATE INDEX "SemanticSnapshotManifest_employerId_period_state_idx" ON "SemanticSnapshotManifest"("employerId", "period", "state");

-- CreateIndex
CREATE INDEX "SemanticSnapshotManifest_generationId_state_idx" ON "SemanticSnapshotManifest"("generationId", "state");

-- CreateIndex
CREATE UNIQUE INDEX "SemanticSnapshotManifest_generationId_employerId_period_par_key" ON "SemanticSnapshotManifest"("generationId", "employerId", "period", "partitionKey", "version");

-- CreateIndex
CREATE INDEX "SemanticPublicationPointer_generationId_idx" ON "SemanticPublicationPointer"("generationId");

-- CreateIndex
CREATE UNIQUE INDEX "SemanticPublicationPointer_employerId_period_partitionKey_key" ON "SemanticPublicationPointer"("employerId", "period", "partitionKey");

-- CreateIndex
CREATE INDEX "SemanticPublicationAudit_employerId_period_partitionKey_cre_idx" ON "SemanticPublicationAudit"("employerId", "period", "partitionKey", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SemanticRefreshJob_idempotencyKey_key" ON "SemanticRefreshJob"("idempotencyKey");

-- CreateIndex
CREATE INDEX "SemanticRefreshJob_status_availableAt_idx" ON "SemanticRefreshJob"("status", "availableAt");

-- CreateIndex
CREATE INDEX "SemanticRefreshJob_generationId_employerId_period_idx" ON "SemanticRefreshJob"("generationId", "employerId", "period");

-- CreateIndex
CREATE INDEX "SourceActivationAudit_nextGenerationId_createdAt_idx" ON "SourceActivationAudit"("nextGenerationId", "createdAt");

-- AddForeignKey
ALTER TABLE "SourceGenerationCursor" ADD CONSTRAINT "SourceGenerationCursor_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "SourceGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemanticSnapshotManifest" ADD CONSTRAINT "SemanticSnapshotManifest_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "SourceGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceConnectionVault" ADD CONSTRAINT "SourceConnectionVault_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "SourceGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

