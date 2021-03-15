# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "java-boot-camp"
  spec.version       = "1.0.0"
  spec.authors       = ["Albert Attard"]
  spec.email         = ["albertattard@gmail.com"]

  spec.summary       = %q{Java Boot Camp}
  spec.homepage      = "https://github.com/albertattard/java-boot-camp"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README)}i) }
  spec.executables   << 'java-boot-camp'

  spec.add_runtime_dependency "bundler", "~> 2.2.14"
  spec.add_runtime_dependency "jekyll", ">= 3.8.5", "< 4.1.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.0"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4.0"
  spec.add_runtime_dependency "rake", ">= 12.3.1", "< 13.1.0"
  spec.add_runtime_dependency "just-the-docs", "~> 0.2.8"

end
