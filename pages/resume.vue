<template>
  <div class="resume-page">
    <!-- Header Controls -->
    <header class="resume-header">
      <div class="l-container resume-header-container">
        <div class="resume-header-left">
          <AppPageTransitionBg :url="'/'" :color="'#f0efeb'" class="resume-back-link">
            <span class="resume-back-arrow">←</span>
            <span class="resume-back-text">BACK TO FOLIO</span>
          </AppPageTransitionBg>
          <div class="resume-read-title-wrap">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'CURRICULUM VITAE', 'PRATYAKSH KALSI']" :modifier="'section'" />
          </div>
        </div>

        <div class="resume-header-actions">
          <div class="resume-view-toggle">
            <button
              class="resume-toggle-btn"
              :class="{ 'is-active': viewMode === 'pdf' }"
              @click="viewMode = 'pdf'"
            >
              PDF PREVIEW
            </button>
            <button
              class="resume-toggle-btn"
              :class="{ 'is-active': viewMode === 'digital' }"
              @click="viewMode = 'digital'"
            >
              DIGITAL VIEW
            </button>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            class="resume-action-btn resume-action-btn-secondary pc-only"
          >
            OPEN IN NEW TAB ↗
          </a>

          <a
            href="/resume.pdf"
            download="Pratyaksh_Kalsi_Resume.pdf"
            class="resume-action-btn resume-action-btn-primary"
          >
            <svg class="resume-download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>DOWNLOAD RESUME (PDF)</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="resume-main">
      <div class="l-container">
        <!-- PDF Viewer Mode -->
        <div v-show="viewMode === 'pdf'" class="resume-pdf-wrapper">
          <div class="resume-pdf-bar">
            <span class="resume-pdf-label">DOCUMENT: PRATYAKSH_KALSI_RESUME.PDF</span>
            <a href="/resume.pdf" download="Pratyaksh_Kalsi_Resume.pdf" class="resume-pdf-bar-download">DOWNLOAD FILE</a>
          </div>
          <div class="resume-pdf-frame-container">
            <object
              data="/resume.pdf#toolbar=1&navpanes=0"
              type="application/pdf"
              class="resume-pdf-frame"
            >
              <iframe
                src="/resume.pdf"
                class="resume-pdf-frame"
                title="Pratyaksh Kalsi Resume PDF"
              >
                <div class="resume-pdf-fallback">
                  <p>Your browser doesn't support direct PDF preview.</p>
                  <a href="/resume.pdf" download="Pratyaksh_Kalsi_Resume.pdf" class="resume-action-btn resume-action-btn-primary">
                    DOWNLOAD RESUME (PDF)
                  </a>
                </div>
              </iframe>
            </object>
          </div>
        </div>

        <!-- Digital Executive Resume Mode -->
        <div v-show="viewMode === 'digital'" class="resume-digital-card">
          <!-- Document Header -->
          <div class="resume-doc-header">
            <div>
              <h1 class="resume-doc-name">PRATYAKSH KALSI</h1>
              <p class="resume-doc-subtitle">SOFTWARE &amp; FRONTEND DEVELOPER</p>
            </div>
            <div class="resume-doc-contact">
              <p><span>LOCATION:</span> INDIA / REMOTE</p>
              <p><span>EMAIL:</span> <a href="mailto:contact@pratyakshkalsi.com">contact@pratyakshkalsi.com</a></p>
              <p><span>PORTFOLIO:</span> <a href="https://pratyakshkalsi.com" target="_blank" rel="noopener">pratyakshkalsi.com</a></p>
              <p><span>GITHUB:</span> <a href="https://github.com/Pratyaksh1507" target="_blank" rel="noopener">github.com/Pratyaksh1507</a></p>
            </div>
          </div>

          <div class="resume-doc-divider"></div>

          <!-- Summary -->
          <section class="resume-doc-section">
            <h2 class="resume-doc-section-title">PROFESSIONAL SUMMARY</h2>
            <p class="resume-doc-text">
              Software Developer with strong foundation in modern web architectures, component design systems, WebGL / 3D interactive experiences, and emerging AI integrations. Experienced in delivering production-ready applications with Next.js, React, TypeScript, and fluid GSAP physics.
            </p>
          </section>

          <!-- Experience -->
          <section class="resume-doc-section">
            <h2 class="resume-doc-section-title">EXPERIENCE &amp; EMPLOYMENT</h2>

            <div class="resume-doc-entry">
              <div class="resume-doc-entry-header">
                <div>
                  <h3 class="resume-doc-entry-title">FREELANCE WEB DEVELOPER</h3>
                  <p class="resume-doc-entry-org">SELF EMPLOYED</p>
                </div>
                <div class="resume-doc-entry-meta">
                  <span class="resume-doc-entry-badge">FREELANCE / CONTRACT</span>
                  <span class="resume-doc-entry-date">MAY 2026 — PRESENT</span>
                </div>
              </div>
              <ul class="resume-doc-bullets">
                <li>Designing and engineering responsive, high-performance web applications and interactive 3D WebGL interfaces.</li>
                <li>Building customized client platforms using Next.js 15, React, TypeScript, Tailwind CSS, and GSAP.</li>
              </ul>
            </div>

            <div class="resume-doc-entry">
              <div class="resume-doc-entry-header">
                <div>
                  <h3 class="resume-doc-entry-title">FRONTEND DEVELOPER (PART-TIME)</h3>
                  <p class="resume-doc-entry-org">SFORGER</p>
                </div>
                <div class="resume-doc-entry-meta">
                  <span class="resume-doc-entry-badge">PART-TIME</span>
                  <span class="resume-doc-entry-date">APR 2026 — SEPT 2026</span>
                </div>
              </div>
              <ul class="resume-doc-bullets">
                <li>Developing modular frontend components, architecting client-side logic, and ensuring seamless responsive user experiences.</li>
                <li>Implementing robust state management, clean architecture, and REST API integrations.</li>
              </ul>
            </div>

            <div class="resume-doc-entry">
              <div class="resume-doc-entry-header">
                <div>
                  <h3 class="resume-doc-entry-title">FRONTEND DEVELOPER INTERN</h3>
                  <p class="resume-doc-entry-org">FLICKERLINK TECHNOLOGIES (OPC) PVT LTD</p>
                </div>
                <div class="resume-doc-entry-meta">
                  <span class="resume-doc-entry-badge">INTERNSHIP</span>
                  <span class="resume-doc-entry-date">NOV 2025 — APR 2026</span>
                </div>
              </div>
              <ul class="resume-doc-bullets">
                <li>Contributed to frontend product development, integrated RESTful APIs, and resolved cross-browser compatibility issues.</li>
                <li>Collaborated in agile team code reviews, Git workflows, and UI optimizations.</li>
              </ul>
            </div>
          </section>

          <!-- Education -->
          <section class="resume-doc-section">
            <h2 class="resume-doc-section-title">EDUCATION</h2>
            <div class="resume-doc-entry">
              <div class="resume-doc-entry-header">
                <div>
                  <h3 class="resume-doc-entry-title">BACHELOR OF TECHNOLOGY (B.TECH) IN ECE</h3>
                  <p class="resume-doc-entry-org">NATIONAL INSTITUTE OF TECHNOLOGY (NIT) SRINAGAR</p>
                </div>
                <div class="resume-doc-entry-meta">
                  <span class="resume-doc-entry-badge">GRADUATED</span>
                  <span class="resume-doc-entry-date">2020 — 2024</span>
                </div>
              </div>
              <p class="resume-doc-text">
                Coursework &amp; Foundations: Data Structures, Algorithms, Computational Logic, Signals &amp; Systems, Embedded Systems, Circuit Theory.
              </p>
            </div>
          </section>

          <!-- Skills -->
          <section class="resume-doc-section">
            <h2 class="resume-doc-section-title">TECHNICAL SKILLS</h2>
            <div class="resume-skills-grid">
              <div class="resume-skill-group">
                <span class="resume-skill-cat">LANGUAGES &amp; FRAMEWORKS:</span>
                <p>JavaScript (ES6+), TypeScript, React, Next.js, HTML5, CSS3, SCSS, Tailwind CSS, Python</p>
              </div>
              <div class="resume-skill-group">
                <span class="resume-skill-cat">CREATIVE &amp; 3D:</span>
                <p>Three.js, WebGL GLSL Shaders, GSAP, ASScroll, UI/UX Animations</p>
              </div>
              <div class="resume-skill-group">
                <span class="resume-skill-cat">TOOLS &amp; BACKEND:</span>
                <p>Node.js, Express, Supabase pgvector, OpenAI API, Git, GitHub, REST APIs, Vercel</p>
              </div>
            </div>
          </section>

          <!-- Featured Projects -->
          <section class="resume-doc-section">
            <h2 class="resume-doc-section-title">FEATURED PROJECTS</h2>
            <div class="resume-projects-list">
              <div class="resume-project-item">
                <span class="resume-project-name">1. COUNSEL AI</span> &mdash;
                <span class="resume-project-desc">Legal AI workspace with Next.js, Supabase pgvector, OpenAI API, and Three.js.</span>
              </div>
              <div class="resume-project-item">
                <span class="resume-project-name">2. HORIZON STAY</span> &mdash;
                <span class="resume-project-desc">Luxury cabin hospitality and reservation platform with fluid animations.</span>
              </div>
              <div class="resume-project-item">
                <span class="resume-project-name">3. ARTISAN CAFE</span> &mdash;
                <span class="resume-project-desc">Artisanal coffee experience and digital ordering web application.</span>
              </div>
              <div class="resume-project-item">
                <span class="resume-project-name">4. 3D CREATIVE PORTFOLIO</span> &mdash;
                <span class="resume-project-desc">Interactive portfolio built with Nuxt, Three.js custom shaders, and GSAP physics.</span>
              </div>
            </div>
          </section>

          <!-- Document Footer Download -->
          <div class="resume-doc-footer">
            <a href="/resume.pdf" download="Pratyaksh_Kalsi_Resume.pdf" class="resume-action-btn resume-action-btn-primary">
              <svg class="resume-download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>DOWNLOAD PDF RESUME</span>
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Action Button for Mobile -->
    <div class="resume-floating-bar sp-only">
      <a href="/resume.pdf" download="Pratyaksh_Kalsi_Resume.pdf" class="resume-floating-download">
        DOWNLOAD RESUME (PDF)
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resume',

  data() {
    return {
      viewMode: 'pdf',
      isTextSegmentState: 'center',
    }
  },

  head() {
    return {
      title: 'Pratyaksh Kalsi Portfolio | Resume',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Pratyaksh Kalsi Portfolio | Resume' },
        { hid: 'description', property: 'og:description', content: 'View and download the software developer resume of Pratyaksh Kalsi.' },
      ],
    }
  },

  computed: {
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    openningEnd() {
      return this.$store.getters['openning/state']
    },
  },

  mounted() {
    if (this.$SITECONFIG && (this.$SITECONFIG.isMobile || this.$SITECONFIG.isTouch)) {
      this.viewMode = 'digital'
    }
    this.$nextTick(() => {
      if (this.defaultTransitionState) {
        this.$store.commit('bg-transition/end')
      }
      this.$store.commit('mouse/loadend')
      if (this.$SITECONFIG.isTouch) {
        this.$backfaceScroll(true)
      }
      if (this.$asscroll) {
        this.$asscroll.disable()
      }
    })
  },

  beforeDestroy() {
    if (this.$asscroll) {
      this.$asscroll.enable({ reset: true })
    }
  },
}
</script>

<style scoped lang="scss">
.resume-page {
  min-height: 100vh;
  background-color: #0d0e12;
  color: $white;
  padding: 120px 0 80px 0;
  position: relative;
  z-index: 2;

  @include sp() {
    padding: 80px 0 100px 0;
  }
}

.resume-header {
  margin: 0 0 32px 0;
}

.resume-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.resume-header-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resume-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #a1a1aa;
  font-size: 13px;
  letter-spacing: 0.05em;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: $white;
  }
}

.resume-back-arrow {
  font-size: 16px;
}

.resume-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.resume-view-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.resume-toggle-btn {
  background: transparent;
  color: #a1a1aa;
  border: none;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.is-active {
    background: #4f46e5;
    color: $white;
  }
}

.resume-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.resume-action-btn-primary {
  background: #4f46e5;
  color: $white;
  border: 1px solid #6366f1;

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
  }
}

.resume-action-btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #e4e4e7;
  border: 1px solid rgba(255, 255, 255, 0.15);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: $white;
  }
}

.resume-download-icon {
  flex-shrink: 0;
}

/* PDF Viewer Frame */
.resume-pdf-wrapper {
  background: #18181b;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.resume-pdf-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #27272a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.resume-pdf-label {
  color: #a1a1aa;
  font-weight: 600;
}

.resume-pdf-bar-download {
  color: #818cf8;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
}

.resume-pdf-frame-container {
  width: 100%;
  height: 85vh;
  min-height: 600px;
  background: #2d2d30;
}

.resume-pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.resume-pdf-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  padding: 40px;
  text-align: center;
}

/* Digital Document Card */
.resume-digital-card {
  max-width: 900px;
  margin: 0 auto;
  background: #18181b;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 48px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  @include sp() {
    padding: 24px 18px;
  }
}

.resume-doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.resume-doc-name {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
  margin: 0 0 6px 0;
  color: $white;

  @include sp() {
    font-size: 28px;
  }
}

.resume-doc-subtitle {
  font-size: 14px;
  font-weight: 700;
  color: #818cf8;
  letter-spacing: 0.05em;
  margin: 0;
}

.resume-doc-contact {
  font-size: 11px;
  line-height: 1.6;
  color: #a1a1aa;

  span {
    color: #71717a;
    font-weight: 600;
  }

  a {
    color: #e4e4e7;
    text-decoration: none;

    &:hover {
      color: #818cf8;
      text-decoration: underline;
    }
  }
}

.resume-doc-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 24px 0 32px 0;
}

.resume-doc-section {
  margin: 0 0 36px 0;
}

.resume-doc-section-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #818cf8;
  text-transform: uppercase;
  margin: 0 0 16px 0;
  padding: 0 0 6px 0;
  border-bottom: 1px dashed rgba(129, 140, 248, 0.3);
}

.resume-doc-text {
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d8;
  margin: 0;
}

.resume-doc-entry {
  margin: 0 0 24px 0;

  &:last-of-type {
    margin: 0;
  }
}

.resume-doc-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 8px 0;
}

.resume-doc-entry-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: $white;
  margin: 0 0 2px 0;
}

.resume-doc-entry-org {
  font-size: 12px;
  color: #a1a1aa;
  font-weight: 600;
  margin: 0;
}

.resume-doc-entry-meta {
  display: flex;
  align-items: center;
  gap: 10px;

  @include sp() {
    width: 100%;
    justify-content: space-between;
  }
}

.resume-doc-entry-badge {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  background: rgba(79, 70, 229, 0.25);
  color: #c7d2fe;
  border-radius: 4px;
  border: 1px solid rgba(99, 102, 241, 0.4);
}

.resume-doc-entry-date {
  font-size: 11px;
  color: #71717a;
  font-weight: 600;
}

.resume-doc-bullets {
  margin: 8px 0 0 0;
  padding-left: 18px;
  font-size: 12.5px;
  line-height: 1.55;
  color: #d4d4d8;

  li {
    margin: 0 0 4px 0;
  }
}

.resume-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.resume-skill-group {
  background: rgba(255, 255, 255, 0.04);
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  p {
    font-size: 12px;
    line-height: 1.5;
    color: #e4e4e7;
    margin: 0;
  }
}

.resume-skill-cat {
  display: block;
  font-size: 10px;
  font-weight: 800;
  color: #818cf8;
  letter-spacing: 0.05em;
  margin: 0 0 6px 0;
}

.resume-projects-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.resume-project-item {
  font-size: 12.5px;
  line-height: 1.5;
  color: #d4d4d8;
}

.resume-project-name {
  font-weight: 700;
  color: $white;
}

.resume-doc-footer {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

/* Floating Mobile Bar */
.resume-floating-bar {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 100;
}

.resume-floating-download {
  display: block;
  text-align: center;
  background: #4f46e5;
  color: $white;
  padding: 14px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6);
}
</style>
