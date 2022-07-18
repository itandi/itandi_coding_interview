FROM ruby:3.1.2-slim-bullseye

ENV LANG="C.UTF-8" \
    TZ="Asia/Tokyo" \
    BUNDLER_VERSION="2.3.18"

RUN set -eu \
  && apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    libmariadb-dev-compat \
    libmariadb-dev \
  && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
  && apt-get install -y nodejs \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends yarn \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && gem install bundler -v ${BUNDLER_VERSION}

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock /usr/src/app/

RUN bundle install -j4

COPY . ./

EXPOSE 3000
