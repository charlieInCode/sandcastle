import { describe, expect, it } from "vitest";
import {
  findCollision,
  isActiveWorktree,
  isManagedWorktree,
} from "./WorktreeManager.js";

// On Windows, `git worktree list --porcelain` reports paths with forward
// slashes, while `node:path.join` produces backslashes. The comparison sites
// in WorktreeManager mix the two, so without separator normalization every
// comparison silently fails on Windows. These tests feed git-style (`/`) paths
// against join-style (`\`) paths to reproduce that mismatch on any host.

describe("findCollision (Windows separator mismatch)", () => {
  it("falls back to a path match when the branch is null (detached HEAD)", () => {
    const existing = [
      { path: "C:/repo/.sandcastle/worktrees/feat-rebase", branch: null },
    ];
    const worktreePath = "C:\\repo\\.sandcastle\\worktrees\\feat-rebase";

    const collision = findCollision(existing, "feat/rebase", worktreePath);

    expect(collision?.path).toBe("C:/repo/.sandcastle/worktrees/feat-rebase");
  });

  it("matches by branch regardless of separators", () => {
    const existing = [
      { path: "C:/repo/.sandcastle/worktrees/my-branch", branch: "my-branch" },
    ];

    const collision = findCollision(
      existing,
      "my-branch",
      "C:\\repo\\.sandcastle\\worktrees\\my-branch",
    );

    expect(collision?.path).toBe("C:/repo/.sandcastle/worktrees/my-branch");
  });
});

describe("isManagedWorktree (Windows separator mismatch)", () => {
  it("recognizes a managed worktree when git uses / and join uses \\", () => {
    const collisionPath = "C:/repo/.sandcastle/worktrees/my-branch";
    const worktreesDir = "C:\\repo\\.sandcastle\\worktrees";

    expect(isManagedWorktree(collisionPath, worktreesDir)).toBe(true);
  });

  it("treats the main working tree as external (not managed)", () => {
    const collisionPath = "C:/repo";
    const worktreesDir = "C:\\repo\\.sandcastle\\worktrees";

    expect(isManagedWorktree(collisionPath, worktreesDir)).toBe(false);
  });
});

describe("isActiveWorktree (Windows separator mismatch)", () => {
  it("recognizes an active worktree when git uses / and join uses \\", () => {
    const active = new Set(["C:/repo/.sandcastle/worktrees/wt-123"]);
    const entryPath = "C:\\repo\\.sandcastle\\worktrees\\wt-123";

    expect(isActiveWorktree(entryPath, active)).toBe(true);
  });

  it("flags a directory not in git's active list as orphaned", () => {
    const active = new Set(["C:/repo/.sandcastle/worktrees/wt-123"]);
    const entryPath = "C:\\repo\\.sandcastle\\worktrees\\orphan";

    expect(isActiveWorktree(entryPath, active)).toBe(false);
  });
});
