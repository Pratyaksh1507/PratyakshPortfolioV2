<template>
  <div class="card-experience">
    <article class="card-experience-article" :class="'card-experience-article-' + modifier">
      <div class="card-experience-inner">
        <div class="card-experience-header">
          <span class="card-experience-company">{{ company }}</span>
          <span class="card-experience-type">{{ type }}</span>
        </div>

        <div class="card-experience-meta">
          <p class="card-experience-period">{{ period }}</p>
          <p class="card-experience-location">{{ location }}</p>
        </div>

        <h3 class="card-experience-role">{{ role }}</h3>

        <div class="card-experience-skills">
          <span v-for="(skill, index) in skills.slice(0, 4)" :key="index" class="card-experience-skill-pill">
            {{ skill }}
          </span>
        </div>

        <p class="card-experience-desc">{{ description }}</p>

        <div class="card-experience-watermark">
          {{ badge }}
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: String,
      required: true,
    },
    shortRole: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
    period: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    skills: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: 'DEV',
    },
    modifier: {
      type: String,
      default: 'exp-current',
    },
  },
}
</script>

<style scoped lang="scss">
.card-experience {
  position: absolute;
  top: 0;
  left: 0;
}

.card-experience-article {
  position: relative;
  width: 250px;
  height: 330px;
  padding: 22px 18px;
  background-color: $white;
  color: $black;
  border-radius: 12px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.card-experience-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.card-experience-header {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 0 0 10px 0;
}

.card-experience-company {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.25;
  text-transform: uppercase;
}

.card-experience-type {
  display: inline-block;
  align-self: flex-start;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.05em;
  opacity: 0.8;
  text-transform: uppercase;
}

.card-experience-meta {
  margin: 0 0 10px 0;
}

.card-experience-period {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin: 0 0 2px 0;
}

.card-experience-location {
  font-size: 10px;
  letter-spacing: 0.02em;
  opacity: 0.75;
  margin: 0;
}

.card-experience-role {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
  margin: 0 0 10px 0;
  text-transform: uppercase;
}

.card-experience-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 0 10px 0;
  z-index: 3;
}

.card-experience-skill-pill {
  font-size: 8.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  text-transform: uppercase;
}

.card-experience-desc {
  font-size: 10px;
  line-height: 1.35;
  letter-spacing: 0.01em;
  opacity: 0.9;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  z-index: 3;
}

.card-experience-watermark {
  position: absolute;
  bottom: -18px;
  right: -6px;
  font-size: 110px;
  font-family: $sixcaps;
  line-height: 0.8;
  letter-spacing: 0.02em;
  pointer-events: none;
  opacity: 0.22;
  z-index: 1;
}

/* Modifiers */
.card-experience-article-exp-current {
  background: linear-gradient(145deg, #3730a3, #4f46e5);
  color: $white;

  .card-experience-skill-pill {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }

  .card-experience-watermark {
    color: #a5b4fc;
    opacity: 0.25;
  }
}

.card-experience-article-exp-frontend {
  background: linear-gradient(145deg, #c2410c, #ea580c);
  color: $white;

  .card-experience-skill-pill {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }

  .card-experience-watermark {
    color: #fed7aa;
    opacity: 0.25;
  }
}

.card-experience-article-exp-intern {
  background: linear-gradient(145deg, #0e7490, #0891b2);
  color: $white;

  .card-experience-skill-pill {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }

  .card-experience-watermark {
    color: #a5f3fc;
    opacity: 0.25;
  }
}

.card-experience-article-exp-edu {
  background: linear-gradient(145deg, #991b1b, #dc2626);
  color: $white;

  .card-experience-skill-pill {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }

  .card-experience-watermark {
    color: #fecaca;
    opacity: 0.25;
  }
}
</style>
