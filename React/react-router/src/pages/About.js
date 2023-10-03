import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function About() {
  const [user, setUser] = useState("mario");

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="about">
      <h2>About Us</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quae tempore dolor, amet ab cupiditate sit qui accusantium nihil molestias? Blanditiis, totam. Eligendi adipisci animi, atque repellendus saepe nihil magni.</p>

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus odit officia numquam temporibus repellat, ut recusandae veniam voluptatum perferendis dolorum eveniet a rem nulla ab sequi quis eos est sed?</p>

      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit magnam aspernatur neque esse rerum, numquam ipsum, aperiam eligendi blanditiis delectus modi, minima inventore quas! Unde voluptatum dolores doloremque exercitationem obcaecati.</p>

      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}
