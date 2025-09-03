# Dockerfile for Portal API Mock Server
FROM node:18-alpine

# Install Prism CLI globally
RUN npm install -g @stoplight/prism-cli

# Set working directory
WORKDIR /app

# Copy mock OpenAPI specification (no auth required)
COPY openapi/openapi.mock.yaml ./openapi.yaml

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start Prism mock server
CMD ["prism", "mock", "openapi.yaml", "--port", "3000", "--host", "0.0.0.0", "--dynamic", "--cors", "--errors"]