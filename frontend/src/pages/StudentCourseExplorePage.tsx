import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import { StudentRecommendedCourses, StudentTasks } from "../mocks/student";

const categories = ["全部类别", "桥梁", "安全", "数字化", "通用能力"];
const difficulties = ["全部难度", "初级", "进阶", "高级"];

const StudentCourseExplorePage = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("全部类别");
  const [difficulty, setDifficulty] = useState("全部难度");

  const discoverableCourses = useMemo(() => {
    const allCourses = StudentRecommendedCourses.concat(
      StudentTasks.filter((task) => task.source === "自选" && task.status !== "已完成").map((task) => ({
        id: task.id,
        title: task.title,
        category: task.type === "课程" ? "自定义" : task.type,
        duration: task.estimated,
        difficulty: "进阶" as const,
        rating: 4.5,
        learners: 120
      }))
    );

    const keywordValue = keyword.trim().toLowerCase();
    return allCourses.filter((course) => {
      const matchKeyword =
        keywordValue.length === 0 ||
        course.title.toLowerCase().includes(keywordValue) ||
        course.category.toLowerCase().includes(keywordValue);
      const matchCategory = category === "全部类别" ? true : course.category === category;
      const matchDifficulty = difficulty === "全部难度" ? true : course.difficulty === difficulty;

      return matchKeyword && matchCategory && matchDifficulty;
    });
  }, [keyword, category, difficulty]);

  return (
    <div className="page">
      <PageSection
        title="课程探索"
        description="浏览感兴趣的课程，自主加入学习计划，支持跨专业学习。"
        action={
          <button type="button" className="topbar__cta">
            查看学习路径
          </button>
        }
      >
        <div className="student-explore-toolbar">
          <input
            type="search"
            placeholder="搜索课程 / 关键词 / 技能"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <div className="student-explore-filters">
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              {difficulties.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section className="student-section">
          <header>
            <h3>推荐学习路线</h3>
            <p>从基础到进阶，循序渐进提升核心技能。</p>
          </header>
          <div className="student-path-grid">
            <article className="student-path-card">
              <h4>桥梁巡检能力提升</h4>
              <p>面向桥梁巡检员，覆盖基础理论、现场巡检、安全作业与案例分析。</p>
              <ul>
                <li>桥梁结构基础与病害识别</li>
                <li>巡检现场安全要点</li>
                <li>典型病害案例分析</li>
              </ul>
              <button type="button" className="topbar__cta">
                加入路线
              </button>
            </article>
            <article className="student-path-card">
              <h4>数字化监测专项</h4>
              <p>掌握传感器部署、数据分析与 AI 识别，打造数字化监测能力。</p>
              <ul>
                <li>桥梁健康监测基础</li>
                <li>AI 辅助巡检实战</li>
                <li>监测数据可视化</li>
              </ul>
              <button type="button" className="topbar__cta">
                查看详情
              </button>
            </article>
          </div>
        </section>

        <section className="student-section">
          <header>
            <h3>探索课程</h3>
            <p>从以下课程开始，或换个关键词继续探索。</p>
          </header>

          <div className="student-grid student-grid--courses">
            {discoverableCourses.map((course) => (
              <article key={course.id} className="student-course-card">
                <div className="student-course-card__meta">
                  <span className="tag tag--slate">{course.category}</span>
                  <span className="tag tag--purple">{course.difficulty}</span>
                </div>
                <h4>{course.title}</h4>
                <div className="student-course-card__info">
                  <span>{course.duration}</span>
                  <span>评分 {course.rating.toFixed(1)}</span>
                  <span>{course.learners.toLocaleString()} 人学习</span>
                </div>
                <div className="student-course-card__actions">
                  <button type="button" className="topbar__cta topbar__cta--subtle">
                    收藏
                  </button>
                  <button type="button" className="topbar__cta">
                    开始学习
                  </button>
                </div>
              </article>
            ))}
            {discoverableCourses.length === 0 && (
              <div className="empty-state">
                <h4>暂无符合条件的课程</h4>
                <p>尝试更换关键词或类别，探索更多内容。</p>
              </div>
            )}
          </div>
        </section>
      </PageSection>
    </div>
  );
};

export default StudentCourseExplorePage;


