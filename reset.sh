#!/bin/bash

if [ -d "alltests" ]; then
  find alltests -name "*.json" -type f ! -name "index.json" -delete
fi

cat > alltests/index.json << 'EOF'
{
  "tests": []
}
EOF

if [ -d "notes_school" ]; then
  rm -rf notes_school
fi
