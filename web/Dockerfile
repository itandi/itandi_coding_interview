ARG RUBY_VERSION=3.4.2
FROM ruby:$RUBY_VERSION-slim-bullseye

ENV LANG="C.UTF-8" \
    TZ="Asia/Tokyo" \
    BUNDLER_VERSION="2.6.5"

RUN set -eu \
  && apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    libvips \
    libyaml-dev \
    pkg-config \
    libmariadb-dev-compat \
    libmariadb-dev \
  && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
  && apt-get install -y nodejs \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends yarn \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists /var/cache/apt/archives \
  && gem install bundler -v ${BUNDLER_VERSION}

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./

RUN bundle install -j4 \
  && rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

COPY . ./

EXPOSE 3000
