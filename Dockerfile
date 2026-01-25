FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the application
FROM base AS builder
WORKDIR /app

# Receive the build argument
ARG NEXT_PUBLIC_BACK_URL
ENV NEXT_PUBLIC_BACK_URL=$NEXT_PUBLIC_BACK_URL

# Debug: Verify the env var is set
RUN echo "================================================"
RUN echo "NEXT_PUBLIC_BACK_URL is set to: ${NEXT_PUBLIC_BACK_URL}"
RUN echo "================================================"

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Debug: Verify env var before build
RUN echo "Before build - NEXT_PUBLIC_BACK_URL: ${NEXT_PUBLIC_BACK_URL}"

# Build the application
RUN npm run build

# Debug: Confirm build completed
RUN echo "================================================"
RUN echo "Build complete!"
RUN echo "================================================"

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create .next directory
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
