import AdminCommunityActions from "@/app/components/community/AdminCommunityActions";
import { getAllCommunityItemsForAdmin } from "@/app/api/apiServices/communityService";
import FeatureButton from "@/app/components/admin/FeatureButton";
import PinCommunityPostButton from "@/app/components/community/PinCommunityPostButton";

export default async function AdminCommunityPage() {
  const { posts, replies } = await getAllCommunityItemsForAdmin();

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
          Admin Community
        </p>

        <h1 className="mt-3 text-2xl font-black">Community Moderation</h1>

        <p className="mt-3 text-violet-50/70">
          Review community posts and replies before they become public.
        </p>
      </section>

      <section className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6">
        <h2 className="text-2xl font-black">Posts</h2>

        <div className="mt-5 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-2xl bg-white/[0.05] p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                    {post.status}
                  </span>
                  {post.pinned && (
                    <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-[#160524]">
                      Pinned
                    </span>
                  )}
                  <h3 className="mt-3 text-xl font-black">{post.title}</h3>

                  <p className="mt-1 text-sm text-violet-50/55">
                    {post.category} · {post.profiles?.full_name || "Student"}
                  </p>

                  <div
                    className="mt-3 line-clamp-3 text-sm text-violet-50/70"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <PinCommunityPostButton
                    postId={post.id}
                    pinned={post.pinned || false}
                  />
                  <FeatureButton
                    itemId={post.id}
                    itemType="community"
                    featured={post.featured || false}
                  />

                  <AdminCommunityActions type="post" id={post.id} />
                </div>
              </div>
            </div>
          ))}

          {!posts.length && (
            <p className="text-violet-50/60">No posts found.</p>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6">
        <h2 className="text-2xl font-black">Replies</h2>

        <div className="mt-5 space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="rounded-2xl bg-white/[0.05] p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                    {reply.status}
                  </span>

                  <p className="mt-3 text-sm text-violet-50/55">
                    Reply to: {reply.community_posts?.title || "Post"}
                  </p>

                  <p className="mt-1 text-sm text-violet-50/55">
                    By {reply.profiles?.full_name || "Student"}
                  </p>

                  <div
                    className="mt-3 line-clamp-3 text-sm text-violet-50/70"
                    dangerouslySetInnerHTML={{ __html: reply.content }}
                  />
                </div>

                <AdminCommunityActions
                  type="reply"
                  id={reply.id}
                  postId={reply.post_id}
                />
              </div>
            </div>
          ))}

          {!replies.length && (
            <p className="text-violet-50/60">No replies found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
