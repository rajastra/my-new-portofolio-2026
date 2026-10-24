"""Downsamples .icon-small.png (from make-icons.mjs) into src/app/favicon.ico (16, 32, 48 px)."""
from pathlib import Path

from PIL import Image

src = Path(".icon-small.png")
big = Image.open(src).convert("RGBA")
sizes = [16, 32, 48]
images = [big.resize((s, s), Image.LANCZOS) for s in sizes]
images[-1].save("src/app/favicon.ico", sizes=[(s, s) for s in sizes], append_images=images[:-1])
src.unlink()
print("saved src/app/favicon.ico")
