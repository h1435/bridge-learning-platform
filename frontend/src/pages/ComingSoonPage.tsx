import type { Priority } from "../mocks/navigation";

type ComingSoonPageProps = {
  code?: string;
  title?: string;
  priority?: Priority;
};

const priorityLabel: Record<Priority, string> = {
  P1: "高优先级",
  P2: "次高优先级",
  P3: "后续补充"
};

const ComingSoonPage = ({
  code,
  title = "功能开发中",
  priority = "P2"
}: ComingSoonPageProps) => {
  return (
    <div className="coming-soon">
      <div className="coming-soon__badge">{priority}</div>
      <h2>
        {code ? `${code} ${title}` : title}
      </h2>
      <p>
        该页面目前尚未实现，将在后续迭代中完成。当前优先级：
        {priorityLabel[priority]}。
      </p>
    </div>
  );
};

export default ComingSoonPage;

