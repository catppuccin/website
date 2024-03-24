{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  name = "bunda";

  buildInputs = with pkgs; [
    bun
  ];
}
