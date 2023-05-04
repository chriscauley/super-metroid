for logic in mirror vanilla
do
    for layout in nordub legacy streaming alt-streaming
    do
        python3 scripts/dzi.py client/layouts/$logic/$layout
    done
done